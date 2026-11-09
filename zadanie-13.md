# Zadanie 13 — JSDoc dla `fetchUserData`

## Pliki

- `fetch-user.js` — funkcja bez komentarzy.
- `fetch-user-documented.js` — ta sama funkcja z blokiem JSDoc nad deklaracją. Ciało funkcji jest bez zmian.

## Czym jest JSDoc

JSDoc to komentarz blokowy `/** ... */` tuż nad funkcją, klasą albo polem. Narzędzia (edytor, TypeScript w trybie `checkJs`, generatory dokumentacji) czytają znaczniki zaczynające się od `@` i pokazują opis przy podpowiedziach oraz w wygenerowanej dokumentacji.

W tym komentarzu są dwa znaczniki:

- `@param {string|number} userId` — typ i znaczenie argumentu. `userId` trafia do ścieżki `/users/{userId}`.
- `@returns {Promise<{name: string, email: string, lastLogin: Date}|null>}` — funkcja zwraca obietnicę. Po sukcesie jest obiekt z `name`, `email` i `lastLogin` (`Date` z `lastLoginTimestamp`). Po błędzie sieć, status HTTP albo JSON są łapane w `.catch`, logowane i zamieniane na `null`, więc obietnica się rozwiązuje, a nie odrzuca.

Tekst nad znacznikami opisuje adres żądania i to, które pola z odpowiedzi są przepisywane. Sam kod tego nie mówi wprost osobie, która tylko wywołuje funkcję.
