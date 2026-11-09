# Zadanie 10 — `.gitignore` (Node.js, Docker, lokalna MongoDB)

## Wygenerowany plik

Zawartość zapisana w repozytorium jako `.gitignore`:

```gitignore
# Dependencies
node_modules/

# Environment and secrets
.env
.env.*
!.env.example

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Build output and caches
dist/
build/
.cache/
*.tsbuildinfo

# Test coverage
coverage/
.nyc_output/

# Docker: local volumes and machine-specific overrides
docker-data/
mongo-volume/
docker-compose.override.yml

# Local MongoDB data (WiredTiger files, journal, lock)
mongo-data/
mongodb-data/
data/db/
dump/
*.wt
WiredTiger*
mongod.lock
journal/
diagnostic.data/

# OS and editors
.DS_Store
Thumbs.db
.idea/
.vscode/
*.swp
```

## Dlaczego ważne jest ignorowanie tych plików?

Git ma trzymać kod i konfigurację, którą da się odtworzyć. Pliki poniżej są lokalne, ciężkie albo zawierają sekrety — ich commit psuje repozytorium albo ujawnia dane.

- **`node_modules/`** — zależności instaluje `npm install` z `package.json` i lockfile. Katalog waży setki megabajtów, różni się między systemami i nie jest źródłem projektu.
- **`.env` i `.env.*`** — hasła, URI MongoDB, klucze API. W repozytorium trafiają do historii na stałe; nawet późniejsze usunięcie nie kasuje ich ze starych commitów. Wzorzec bez sekretów zostaje w `.env.example`.
- **Logi (`*.log`, `logs/`)** — śmieci z uruchomień, często z danymi użytkowników albo ścieżkami z konkretnej maszyny. Nie opisują kodu i tylko zaśmiecają diff.
- **`dist/`, `build/`, cache, coverage** — wynik kompilacji i testów. Odtwarza je build; commitowanie powoduje konflikty przy każdej zmianie źródła.
- **Dane Dockera i MongoDB** (`mongo-data/`, `data/db/`, `dump/`, pliki WiredTiger, `mongod.lock`, `docker-compose.override.yml`) — lokalna baza i wolumeny. To dane runtime, nie kod: duże pliki binarne, stan jednej maszyny, czasem dane osobowe. Każdy developer podnosi własną bazę (`docker compose up`), a nie kopiuje cudzy katalog danych.
- **Pliki systemu i edytora** (`.DS_Store`, `.idea/`, `.vscode/`) — ustawienia jednego komputera. Wciągnięcie ich wymusza te same ustawienia na całym zespole i generuje zbędne zmiany w historii.

Bez `.gitignore` łatwo przypadkiem zacommitować sekrety albo bazę. Historia Gita wtedy albo wycieka hasła, albo puchnie od binariów, których nie da się sensownie reviewować i mergować.
