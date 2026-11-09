
# Zadanie 20 – Walidacja adresu IPv4 za pomocą wyrażenia regularnego

## 1. Cel zadania

Celem zadania było stworzenie wyrażenia regularnego sprawdzającego poprawność adresów IPv4 oraz funkcji JavaScript wykorzystującej to wyrażenie.

## 2. Wyrażenie regularne

```javascript
/^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/
```

## 3. Wyjaśnienie wyrażenia regularnego

- `^` – początek tekstu.
- `25[0-5]` – liczby od 250 do 255.
- `2[0-4]\d` – liczby od 200 do 249.
- `1\d\d` – liczby od 100 do 199.
- `[1-9]?\d` – liczby od 0 do 99.
- `\.` – separator w postaci kropki.
- `(?:...)` – grupa nieprzechwytująca.
- `{3}` – powtórzenie grupy trzy razy.
- `$` – koniec tekstu.

Wyrażenie sprawdza cztery części adresu IPv4, z których każda musi zawierać wartość od 0 do 255.

## 4. Implementacja JavaScript

Plik: `ipv4-validator.js`

```javascript
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

function isValidIPv4(ip) {
    if (typeof ip !== "string") {
        return false;
    }

    return ipv4Regex.test(ip);
}

module.exports = isValidIPv4;
```

## 5. Przykłady testów

| Adres | Wynik |
|---|---|
| 192.168.1.1 | Poprawny |
| 10.0.0.1 | Poprawny |
| 255.255.255.255 | Poprawny |
| 0.0.0.0 | Poprawny |
| 256.168.1.1 | Niepoprawny |
| 192.168.1 | Niepoprawny |
| 192.168.1.999 | Niepoprawny |
| 192.168.1.1.1 | Niepoprawny |
| abc.def.ghi.jkl | Niepoprawny |
| 192.168.01.1 | Niepoprawny |

## 6. Przykład użycia

```javascript
const isValidIPv4 = require("./ipv4-validator");

console.log(isValidIPv4("192.168.1.1")); 
// true

console.log(isValidIPv4("256.168.1.1")); 
// false

console.log(isValidIPv4("10.0.0.1")); 
// true
```

## 7. Podsumowanie

Zastosowane wyrażenie regularne umożliwia sprawdzanie składni adresów IPv4.

Funkcja isValidIPv4 zwraca wartość true dla poprawnego adresu oraz false dla niepoprawnego.

Rozwiązanie wykorzystuje wyrażenia regularne i metody JavaScript, dzięki czemu jest krótkie, czytelne i łatwe do ponownego wykorzystania.
```

## 6. Struktura plików

```text
projekt/
│
├── ipv4-validator.js
└── zadanie-20.md
```

**Zadanie 20 gotowe!** Masz funkcję walidującą IPv4, wyjaśnienie wyrażenia regularnego oraz przykłady poprawnych i niepoprawnych adresów.

Uwaga: walidacja sprawdza poprawność składni adresu IPv4, a nie to, czy dany adres jest przypisany do urządzenia lub dostępny w sieci.