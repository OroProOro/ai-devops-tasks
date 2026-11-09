# Zadanie 9 — poprawiony Docker Compose

Oryginał nie przejdzie walidacji. Są dwa błędy:

1. Przy usłudze `app` klucz `ports` nie ma dwukropka, więc YAML urywa się na liście portów.
2. `POSTGRES_PASSWORD=password` jest zapisane jak zwykły tekst pod `environment`. Compose oczekuje mapy (`KLUCZ: wartość`) albo listy (`- KLUCZ=wartość`). Bez tego kontener Postgresa nie dostaje hasła i nie startuje.

```yaml
services:
  web:
    image: nginx
    ports:
      - "80:80"
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: password
```
