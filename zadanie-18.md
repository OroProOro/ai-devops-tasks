
# Zadanie 18 – Bezpieczeństwo aplikacji Dockerowych

## 1. Pięć kluczowych praktyk bezpieczeństwa

### 1. Uruchamianie kontenerów jako użytkownik non-root
Kontenery nie powinny działać jako root. Należy tworzyć użytkowników z ograniczonymi uprawnieniami, aby zmniejszyć ryzyko przejęcia systemu.

### 2. Korzystanie z zaufanych obrazów Docker
Należy używać oficjalnych i aktualnych obrazów oraz regularnie skanować je pod kątem podatności.

### 3. Ochrona danych poufnych
Hasła, tokeny i klucze API powinny być przechowywane w bezpiecznych menedżerach sekretów, a nie bezpośrednio w Dockerfile.

### 4. Ograniczanie uprawnień kontenerów
Warto stosować read_only, cap_drop oraz unikać privileged: true.

### 5. Monitorowanie i aktualizacje
Należy regularnie aktualizować obrazy, monitorować logi i sprawdzać aplikacje pod kątem podatności.

## 2. Implementacja pierwszej praktyki

Wybraną praktyką jest uruchamianie kontenerów jako użytkownik nieuprzywilejowany (non-root).

### Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "server.js"]
```

Najważniejsza instrukcja:

`USER node`

Zapewnia uruchamianie aplikacji jako użytkownik node zamiast root.

### docker-compose.yml

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile

    container_name: secure-app

    ports:
      - "3000:3000"

    user: "node"

    restart: unless-stopped

    environment:
      NODE_ENV: production
```

Opcja `user: "node"` dodatkowo określa użytkownika uruchamiającego kontener.

## 3. Uruchomienie aplikacji

Budowanie obrazu:

```bash
docker compose build
```

Uruchomienie kontenera:

```bash
docker compose up -d
```

Sprawdzenie użytkownika:

```bash
docker compose exec app whoami
```

Oczekiwany wynik:

```text
node
```

## 4. Korzyści z zastosowania rozwiązania

1. Ograniczenie uprawnień aplikacji.
2. Zmniejszenie skutków potencjalnego ataku.
3. Lepsza izolacja procesów.
4. Zwiększenie bezpieczeństwa środowiska produkcyjnego.
5. Zgodność z dobrymi praktykami Docker Security.

## 5. Podsumowanie

Uruchamianie kontenerów jako użytkownik non-root jest jedną z podstawowych praktyk bezpieczeństwa Docker.

Zastosowanie instrukcji USER w Dockerfile oraz opcji user w docker-compose.yml pozwala ograniczyć uprawnienia aplikacji i zwiększyć bezpieczeństwo środowiska produkcyjnego.
