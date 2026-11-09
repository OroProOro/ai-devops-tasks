# Zadanie 8 — błąd „address already in use” przy starcie kontenera

## Co oznacza błąd

```text
ERROR: for app  Cannot start service app: driver failed programming external connectivity on endpoint app (172.18.0.2): Error starting userland proxy: listen tcp4 0.0.0.0:3000: bind: address already in use
```

Docker Compose próbuje uruchomić usługę `app` i opublikować jej port na hoście: kontener ma nasłuchiwać tak, żeby z maszyny dało się wejść na `localhost:3000`.

Zanim kontener wystartuje, Docker (przez `docker-proxy`, tzw. userland proxy) musi zająć port **3000** na wszystkich interfejsach hosta (`0.0.0.0:3000`). System odmawia, bo ten port jest już zajęty przez inny proces. Endpoint `172.18.0.2` to tylko adres kontenera w sieci Dockera — sam kontener nie jest przyczyną; problem jest po stronie hosta.

Najczęstsze źródła:

- wcześniej uruchomiony ten sam kontener albo inny kontener z mapowaniem `3000:3000`,
- lokalna aplikacja (Node, inny serwer deweloperski) już słuchająca na porcie 3000,
- proces, który nie został zabity po poprzednim `docker compose down` / crashu.

## Jak rozwiązać

### 1. Sprawdź, kto trzyma port 3000

W PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
  Select-Object LocalAddress, LocalPort, State, OwningProcess
```

Albo:

```powershell
netstat -ano | findstr :3000
```

Ostatnia kolumna w `netstat` to PID. Nazwę procesu sprawdzisz tak:

```powershell
Get-Process -Id <PID>
```

Kontenery Dockera:

```powershell
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}"
```

### 2. Zwolnij port

Jeśli to stary kontener:

```powershell
docker stop <nazwa_lub_id>
docker compose down
```

Jeśli to zwykły proces na hoście (i możesz go zatrzymać):

```powershell
Stop-Process -Id <PID>
```

Potem uruchom stack ponownie (`docker compose up`).

### 3. Albo zmień port hosta

Gdy port 3000 musi zostać zajęty (np. przez lokalny dev server), w `docker-compose` zmień tylko lewą stronę mapowania — port na hoście. Prawa strona to port wewnątrz kontenera i zwykle zostaje bez zmian:

```yaml
ports:
  - "3001:3000"
```

Aplikacja w kontenerze nadal słucha na 3000, a z przeglądarki wchodzisz na `http://localhost:3001`.

### 4. Uruchom ponownie

```powershell
docker compose up
```

Jeśli port jest wolny albo mapowanie wskazuje wolny port hosta, proxy wystartuje i komunikat `bind: address already in use` zniknie.
