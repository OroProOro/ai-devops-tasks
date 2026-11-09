# Zadanie 4: Określanie roli w promptach

Odpowiedzi pochodzą z panelu asystenta Cursor (model Grok). To samo pytanie zadałem dwa razy: najpierw bez roli, potem z przypisaną rolą doświadczonego DevOps Engineera.

## Prompt 1 — zwykłe pytanie

Jak rozwiązać problem z dużym zużyciem pamięci przez kontener Docker?

## Odpowiedź 1

Duże zużycie pamięci przez kontener zwykle oznacza, że proces w środku rośnie albo że kontener nie ma ustawionego limitu i może zająć pamięć hosta. Warto iść od pomiaru do ograniczenia.

1. Sprawdź aktualne zużycie:

```bash
docker stats
```

Kolumna `MEM USAGE / LIMIT` pokazuje, ile pamięci bierze kontener i jaki ma limit. Jeśli limit to cała pamięć hosta, kontener nie jest ograniczony.

2. Zobacz, czy kontener był zabijany z braku pamięci:

```bash
docker inspect <nazwa> --format '{{.State.OOMKilled}} {{.State.ExitCode}}'
```

Wartość `true` przy `OOMKilled` oznacza, że jądro zabiło proces, bo przekroczył limit.

3. Ustaw limit przy uruchamianiu, żeby jeden kontener nie zajął całej maszyny:

```bash
docker run -d --name app --memory 512m --memory-swap 512m obraz:tag
```

W Compose to samo zapisuje się tak:

```yaml
services:
  app:
    image: obraz:tag
    deploy:
      resources:
        limits:
          memory: 512M
```

4. Ogranicz pamięć samej aplikacji, nie tylko kontenera. Przykłady:
   - Node.js: `node --max-old-space-size=384 index.js`
   - Java: `-XX:MaxRAMPercentage=75.0`, żeby sterta liczyła się od limitu kontenera, a nie od pamięci hosta

5. Jeśli zużycie rośnie bez końca i nie spada po obciążeniu, szukaj wycieku w aplikacji: logi, profiler, aktualizacja zależności. Limit Dockera tylko zatrzyma wzrost — nie naprawi wycieku.

6. Użyj lżejszego obrazu bazowego (na przykład `alpine`) i nie trzymaj w kontenerze zbędnych procesów, cache paczek ani dużych plików tymczasowych.

## Prompt 2 — z przypisaną rolą

Jesteś doświadczonym DevOps Engineerem z 10-letnim doświadczeniem. Jak rozwiązać problem z dużym zużyciem pamięci przez kontener Docker?

## Odpowiedź 2

Najpierw ustalam, czy to prawdziwy brak pamięci, czy tylko wysoki odczyt w `docker stats`. Limit ustawiam dopiero wtedy, gdy wiem, co licznik pokazuje. W cgroup v2 do limitu wlicza się nie tylko pamięć anonimowa procesu, ale też page cache plików. Kontener może wyglądać na „pełny”, a jądro nadal może ten cache oddać.

### 1. Oddziel objaw od przyczyny

| Objaw | Co to zwykle jest | Co robię |
| --- | --- | --- |
| `MEM USAGE` wysokie, spada po `echo 3 > /proc/sys/vm/drop_caches` albo po bezczynności | page cache (`file` w `memory.stat`) | nie obcinam aplikacji; patrzę na `anon`, nie na samą sumę |
| `anon` rośnie po każdym żądaniu i nie wraca po GC | wyciek albo cache aplikacji bez limitu | heap dump / pprof, potem limit jako siatka bezpieczeństwa |
| `OOMKilled=true`, exit 137, w `dmesg` jest `Memory cgroup out of memory` | limit niższy niż working set pod szczytem | podnoszę limit albo zmniejszam stertę runtime |
| skok tylko przy starcie, potem stabilnie | JVM/Node liczy stertę od RAM hosta, glibc areny, duży `/dev/shm` | poprawiam flagi runtime, nie obraz |

### 2. Pomiar, zanim ruszę limit

```bash
docker stats --no-stream --format \
  'table {{.Name}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.PIDs}}'

docker inspect "$C" --format \
  'OOMKilled={{.State.OOMKilled}} Exit={{.State.ExitCode}} Error={{.State.Error}}'

cid="$(docker inspect "$C" --format '{{.Id}}')"
# cgroup v2
base="/sys/fs/cgroup/system.slice/docker-${cid}.scope"
# albo: /sys/fs/cgroup/docker/$cid  — zależy od wersji cgroup i CRI
cat "$base/memory.current" "$base/memory.peak" "$base/memory.max"
grep -E '^(anon|file|slab|shmem) ' "$base/memory.stat"
grep -E '^(oom|oom_kill|max) ' "$base/memory.events"
```

`memory.events` z niezerowym `oom_kill` to fakt, nie wrażenie z grafu. W Kubernetes ten sam sygnał jest w `lastState.terminated.reason=OOMKilled` oraz w metrykach `container_memory_working_set_bytes` (to, czego używa kubelet do presji) i `container_memory_rss`. Do limitu i do decyzji o eviction bliżej jest working set niż sam RSS.

### 3. Typowe przyczyny, które widzę na produkcji

- **Runtime ignoruje limit kontenera.** Starsza Java bez `UseContainerSupport` bierze ułamek RAM hosta. Node bez `--max-old-space-size` rośnie, aż cgroup go zabije. Python i natywne alokatory (glibc) potrafią trzymać areny: przy wielu wątkach ustawiam `MALLOC_ARENA_MAX=2`.
- **Cache i tmpfs.** Duży `WORKDIR` z `npm cache`, warstwy obrazu odczytywane przy starcie, logi pisane do pliku w kontenerze, `/dev/shm` domyślnie do połowy RAM (Java i Chrome). `shm_size` ustawiam jawnie, na przykład `--shm-size=64m`.
- **Limit bez rezerwy i bez zapasu na szczyt.** `--memory` to twardy sufit. `--memory-swap` równy `--memory` wyłącza swap cgroup — proces dostaje OOM zamiast zwolnić. W Compose pole `mem_limit` bywa ignorowane przez Swarm na rzecz `deploy.resources`; sprawdzam, który tryb naprawdę działa (`docker compose up` kontra `docker stack deploy`).
- **Siatka bezpieczeństwa mylona z naprawą.** Sam `--memory 512m` na wycieku daje pętlę restartów (`restart: always` + OOM). Najpierw profil, potem limit powyżej zmierzonego szczytu `anon` z zapasem około 20–30% na allocator i cache, którego nie da się uniknąć.

### 4. Poprawka po stronie procesu

Przykład dla Node, gdy zmierzony szczyt sterty mieści się w limicie 512 MiB:

```bash
docker run -d --name app \
  --memory 512m --memory-swap 512m \
  --pids-limit 256 \
  -e NODE_OPTIONS="--max-old-space-size=384" \
  -e MALLOC_ARENA_MAX=2 \
  obraz:tag
```

Dla Javy w kontenerze:

```text
JAVA_TOOL_OPTIONS=-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError
```

`ExitOnOutOfMemoryError` jest celowy: proces ma paść raz, a nie żyć dalej w pół-martwym stanie, którego healthcheck nie widzi.

Jeśli `anon` rośnie liniowo przez godziny, zbieram dowód z wnętrza procesu (async-profiler / `pprof` heap, `jcmd GC.heap_dump`, `tracemalloc`), a nie podnoszę limitu w nieskończoność. W orkiestratorze ustawiam `resources.requests.memory` na typowy working set i `limits.memory` na szczyt z zapasem. Sama różnica request/limit bez danych z `memory.peak` kończy się albo marnowaniem noda, albo eviction pod ruchem.

### 5. Czego nie robię

Nie „naprawiam” wysokiego `docker stats` czyszczeniem cache na hoście w cronie i nie zmniejszam limitu poniżej zmierzonego `anon`, żeby wykres wyglądał spokojniej. To przenosi problem do restartów i 137. Lżejszy obraz bazowy zmniejsza dysk i czas startu, a nie stertę aplikacji.

## Porównanie

| Cecha | Odpowiedź bez roli | Odpowiedź z rolą DevOps |
| --- | --- | --- |
| Szczegółowość | Krótka lista kroków: stats, inspect, limit, flaga runtime, lżejszy obraz | Ta sama ścieżka, ale z rozbiciem liczników, tabelą objaw–przyczyna i konkretnymi plikami cgroup |
| Specjalistyczny charakter | Ogólne pojęcia: limit, OOM, wyciek, alpine | cgroup v2, `anon` kontra `file`, working set kontra RSS, `memory.events`, różnica Compose i Swarm, glibc areny, eviction w Kubernetes |
| Kolejność działań | Szybko przechodzi do ustawienia `--memory` | Najpierw pomiar, który mówi, czy limit w ogóle jest właściwym ruchem |
| Ryzyko złej rady | Limit 512m podany jako typowa wartość, bez zastrzeżenia skąd ma pochodzić | Limit wynika ze zmierzonego szczytu; jest ostrzeżenie, że zły sufit daje pętlę OOM |
| Odbiorca | Osoba, która pierwszy raz widzi `docker stats` | Osoba, która ma kontener na produkcji i musi odróżnić cache od wycieku |

## Obserwacje

Rola nie zmienia faktów, zmienia próg, od którego odpowiedź uznaje temat za zamknięty.

Bez roli dostałem poprawną instrukcję pierwszej pomocy: zmierz, ogranicz, sprawdź runtime, szukaj wycieku. Taka odpowiedź wystarcza, żeby kontener przestał zjadać całego hosta. Miesza jednak wysokie zużycie z awarią. Nie mówi, że page cache w cgroup podbija `docker stats`, więc ktoś może obciąć zdrowy kontener albo uznać cache za wyciek.

Z rolą „DevOps Engineer z 10-letnim doświadczeniem” odpowiedź schodzi do mechanizmu: co dokładnie wlicza się do limitu, które pliki cgroup to potwierdzają, czym working set różni się od RSS i kiedy limit jest szkodliwy. Pojawiają się przypadki z dyżuru (Java licząca RAM hosta, `/dev/shm`, `restart: always` po OOM, request kontra limit w Kubernetes), a nie tylko składnia `docker run -m`.

Rola działa jak filtr odbiorcy. Ten sam model bez niej tłumaczy narzędzie. Z nią zakłada, że odbiorca umie uruchomić kontener i potrzebuje decyzji: podnieść limit, zejść do procesu, czy zignorować cache. Szczegółowość rośnie nie przez dłuższy wstęp, tylko przez warunki, liczby i miejsca, w których ogólna rada się psuje.

Sam dopisek o stażu nie wnosi nowych komend. Wnosi oczekiwanie, że odpowiedź ma bronić się na produkcji: najpierw dowód z `memory.stat` i `OOMKilled`, potem zmiana limitu.
