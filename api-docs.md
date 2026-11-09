
# Dokumentacja API – Lista użytkowników

## 1. Informacje o endpointcie

- **Metoda HTTP:** GET
- **Ścieżka:** `/api/users`
- **Opis:** Endpoint zwraca listę użytkowników systemu.
- **Format odpowiedzi:** JSON

Endpoint umożliwia pobieranie użytkowników z możliwością stronicowania wyników oraz filtrowania według roli.

## 2. Parametry zapytania

| Parametr | Typ | Wymagany | Domyślna wartość | Opis |
|---|---|---|---|---|
| page | integer | Nie | 1 | Numer strony wyników. |
| limit | integer | Nie | 10 | Liczba użytkowników na stronie. Maksymalnie 100. |
| role | string | Nie | Brak | Filtruje użytkowników według przypisanej roli. |

### Szczegóły parametrów

**page**
- Określa numer strony.
- Domyślna wartość: 1.
- Powinna być liczbą całkowitą większą od zera.

**limit**
- Określa maksymalną liczbę wyników na stronie.
- Domyślna wartość: 10.
- Maksymalna wartość: 100.

**role**
- Opcjonalny parametr filtrowania użytkowników.
- Przykładowe wartości: `admin`, `user`, `moderator`.
- Dostępne role zależą od konfiguracji aplikacji.

## 3. Przykładowe żądania

### Pobranie pierwszej strony użytkowników

```http
GET /api/users
```

### Pobranie drugiej strony z 20 użytkownikami

```http
GET /api/users?page=2&limit=20
```

### Pobranie użytkowników z rolą administratora

```http
GET /api/users?role=admin
```

### Filtrowanie i stronicowanie jednocześnie

```http
GET /api/users?page=1&limit=10&role=user
```

## 4. Przykładowa odpowiedź

**Status HTTP:** `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "name": "Jan Kowalski",
      "email": "jan@example.com",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Anna Nowak",
      "email": "anna@example.com",
      "role": "user"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

Powyższa odpowiedź jest przykładowym formatem. Dokładny schemat odpowiedzi zależy od implementacji API.

## 5. Kody odpowiedzi HTTP

| Kod | Znaczenie |
|---|---|
| 200 OK | Żądanie zakończone sukcesem. |
| 400 Bad Request | Nieprawidłowe parametry zapytania. |
| 401 Unauthorized | Użytkownik nie jest uwierzytelniony, jeśli endpoint wymaga logowania. |
| 403 Forbidden | Brak uprawnień do pobrania listy użytkowników. |
| 500 Internal Server Error | Wewnętrzny błąd serwera. |

Kody 401 i 403 mają zastosowanie, jeśli mechanizm autoryzacji jest skonfigurowany dla tego endpointu.

## 6. Przykład użycia za pomocą curl

```bash
curl -X GET "http://localhost:3000/api/users?page=1&limit=10&role=admin" \
  -H "Accept: application/json"
```

## 7. Podsumowanie

Endpoint `GET /api/users` umożliwia:
- Pobieranie listy użytkowników.
- Stronicowanie wyników.
- Określanie liczby wyników na stronie.
- Filtrowanie użytkowników według roli.

Dzięki parametrom zapytania endpoint pozwala elastycznie pobierać dane bez konieczności pobierania całej listy użytkowników.
