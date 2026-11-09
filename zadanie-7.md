# Zadanie 7: Sprawdzenie i uruchomienie usługi Docker

```bash
#!/usr/bin/env bash
set -euo pipefail

if systemctl is-active --quiet docker; then
  echo "Usługa Docker działa."
  exit 0
fi

echo "Usługa Docker nie działa. Próba uruchomienia..."

if sudo systemctl start docker; then
  echo "Usługa Docker została uruchomiona."
else
  echo "Nie udało się uruchomić usługi Docker." >&2
  exit 1
fi
```

## Wyjaśnienie linia po linii

Skrypt sprawdza, czy Docker jest włączony. Jeśli nie jest, próbuje go włączyć i mówi, czy się udało.

**Linia 1:** `#!/usr/bin/env bash`

To pierwsza linia pliku, nazywana shebang. Mówi systemowi: „uruchom ten plik programem bash”. Dzięki niej po nadaniu prawa do uruchamiania (`chmod +x skrypt.sh`) możesz odpalić plik bezpośrednio, na przykład `./skrypt.sh`, a system sam wybierze interpreter.

**Linia 2:** `set -euo pipefail`

To trzy ustawienia bezpieczeństwa, zapisane jedną komendą:

- `-e` — przerwij skrypt, gdy jakaś komenda zakończy się błędem. Bez tego bash idzie dalej, nawet gdy coś się nie udało.
- `-u` — przerwij skrypt, gdy użyjesz zmiennej, której nie ustawiono. Chroni przed literówką w nazwie zmiennej.
- `-o pipefail` — w ciągu komend połączonych znakiem `|` błąd którejkolwiek z nich liczy się jako błąd całości. Domyślnie bash patrzy tylko na ostatnią komendę w takim ciągu.

W tym krótkim skrypcie te opcje głównie pilnują, żeby nieoczekiwany błąd nie został zignorowany.

**Linia 4:** `if systemctl is-active --quiet docker; then`

`systemctl` to program do zarządzania usługami w Linuksie (systemd). Usługa to program działający w tle, tutaj demon Dockera.

- `is-active` pyta: „czy ta usługa teraz działa?”
- `docker` to nazwa usługi.
- `--quiet` wyłącza tekst na ekranie. Komenda i tak zwraca wynik liczbowy: `0`, gdy usługa działa, i inną liczbę, gdy nie działa.

W bashu `if` patrzy właśnie na ten wynik. `0` oznacza sukces, więc warunek jest prawdziwy i skrypt wchodzi do środka `if`. Inna liczba oznacza, że warunek jest fałszywy i skrypt przeskakuje do `fi`.

**Linia 5:** `echo "Usługa Docker działa."`

`echo` wypisuje tekst na ekran. Ta linia wykonuje się tylko wtedy, gdy Docker już działa.

**Linia 6:** `exit 0`

`exit` kończy skrypt od razu. Liczba po nim to kod wyjścia, który dostaje system i inne programy:

- `0` oznacza „wszystko w porządku”,
- liczba inna niż `0` oznacza błąd.

Tu kończymy z `0`, bo Docker działa i nie ma nic do roboty. Dalsze linie się nie wykonają.

**Linia 7:** `fi`

`fi` zamyka blok `if` (to słowo `if` czytane od tyłu). Wszystko między `then` a `fi` należy do tego warunku.

**Linia 9:** `echo "Usługa Docker nie działa. Próba uruchomienia..."`

Do tej linii skrypt dochodzi tylko wtedy, gdy warunek z linii 4 był fałszywy, czyli Docker nie działa. Informuje o tym i zapowiada próbę startu.

**Linia 11:** `if sudo systemctl start docker; then`

Tu znowu jest warunek, ale tym razem komenda coś robi, a nie tylko sprawdza.

- `sudo` uruchamia polecenie z uprawnieniami administratora. Włączanie usług systemowych zwykle tego wymaga, więc może pojawić się prośba o hasło.
- `systemctl start docker` włącza usługę Docker.

Jeśli start się uda, komenda zwraca `0` i wykonują się linie wewnątrz `then`. Jeśli się nie uda, wykonuje się `else`.

**Linia 12:** `echo "Usługa Docker została uruchomiona."`

Wypisuje potwierdzenie, gdy `systemctl start` zakończył się sukcesem.

**Linia 13:** `else`

`else` to druga gałąź warunku: „jeśli poprzednia komenda się nie udała, zrób to”.

**Linia 14:** `echo "Nie udało się uruchomić usługi Docker." >&2`

Zwykłe `echo` pisze na standardowe wyjście (ekran, strumień numer 1). Dopisek `>&2` przekierowuje ten tekst na standardowe wyjście błędów (strumień numer 2).

Dla człowieka na terminalu wygląda to tak samo. Różnica widać w skryptach i logach: komunikaty o błędach można zapisać osobno od zwykłych komunikatów, na przykład `./skrypt.sh 2> bledy.log`.

**Linia 15:** `exit 1`

Kończy skrypt z kodem `1`, czyli „wystąpił błąd”. Kto uruchomił skrypt (człowiek albo inny skrypt) może po tym poznać, że Docker nie został włączony.

**Linia 16:** `fi`

Zamyka drugi blok `if` (ten od `systemctl start`).

### Co się dzieje w praktyce

1. Docker działa — skrypt wypisuje „Usługa Docker działa.” i kończy się kodem `0`.
2. Docker nie działa, a start się udaje — skrypt wypisuje próbę uruchomienia, potem „Usługa Docker została uruchomiona.” i kończy się kodem `0`.
3. Docker nie działa, a start się nie udaje (brak uprawnień, zła instalacja, błąd usługi) — skrypt wypisuje komunikat o błędzie i kończy się kodem `1`.
