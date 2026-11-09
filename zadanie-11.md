# Zadanie 11 — test jednostkowy funkcji `sum` (Jest)

## Czym jest Jest

Jest to framework do testów w JavaScript, utrzymywany przez Meta. Służy do pisania i uruchamiania testów jednostkowych: sprawdza, czy funkcja dla danych argumentów zwraca oczekiwaną wartość.

W teście używa się m.in.:

- `describe` — grupuje powiązane testy pod jedną nazwą,
- `test` (albo `it`) — jeden przypadek testowy,
- `expect(...).toBe(...)` — asercja: porównanie wyniku z wartością oczekiwaną.

Gdy asercja się nie zgadza, Jest kończy ten test błędem i pokazuje różnicę. Dzięki temu widać od razu, która część kodu przestała działać.

## Struktura plików

```
ai-devops-tasks/
├── sum.js           # funkcja sum
├── sum.test.js      # test jednostkowy (Jest)
├── package.json     # powstaje po npm init; skrypt "test"
├── package-lock.json
└── node_modules/    # zależności, w tym jest (po instalacji)
```

Jest sam znajduje pliki o nazwie `*.test.js` i uruchamia je. Nie trzeba podawać ścieżki do testu.

`sum.js` eksportuje funkcję przez `module.exports`, a test ładuje ją przez `require`. To standard CommonJS, który działa w Jest bez dodatkowej konfiguracji.

## Kod funkcji (`sum.js`)

```javascript
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

## Kod testu (`sum.test.js`)

```javascript
const sum = require('./sum');

describe('sum', () => {
  test('dodaje 1 + 2 i zwraca 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('dodaje liczby ujemne', () => {
    expect(sum(-4, -6)).toBe(-10);
  });

  test('dodaje zero', () => {
    expect(sum(7, 0)).toBe(7);
  });
});
```

Test sprawdza trzy przypadki: dwie liczby dodatnie, dwie ujemne oraz dodawanie zera. Każdy przypadek wywołuje `sum` i porównuje wynik z oczekiwaną sumą.

## Instalacja w projekcie

W katalogu repozytorium (tam, gdzie leżą `sum.js` i `sum.test.js`):

```bash
npm init -y
npm install --save-dev jest
```

`npm init -y` tworzy `package.json`. `npm install --save-dev jest` dopisuje Jest jako zależność deweloperską (`devDependencies`), bo testy nie są potrzebne w działającej aplikacji.

W `package.json` dodaj skrypt uruchamiający testy:

```json
"scripts": {
  "test": "jest"
}
```

Jeśli `npm init -y` utworzył już pusty obiekt `scripts`, wystarczy zmienić wartość `test` na `jest`.

## Uruchomienie testu

Z tego samego katalogu:

```bash
npm test
```

Równoważne polecenie, bez skryptu w `package.json`:

```bash
npx jest
```

Przy poprawnym kodzie Jest wypisze, że zestaw `sum` przeszedł (3 testy). Przy błędzie pokaże nazwę testu, otrzymaną wartość i wartość oczekiwaną.
