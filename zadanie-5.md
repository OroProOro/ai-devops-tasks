# Zadanie 5: Diagram połączenia klient — serwer — baza

```
+------------------+        HTTP / HTTPS         +----------------------+        SQL         +------------------+
|                  | --------------------------> |                      | -----------------> |                  |
|      Klient      |                             |   Serwer aplikacji   |                   |   Baza danych    |
|  (przeglądarka)  | <-------------------------- |                      | <----------------- |                  |
|                  |         odpowiedź           |                      |      wynik        |                  |
+------------------+                             +----------------------+                   +------------------+
```

## Diagram z opisami i kierunkiem przepływu

```
        (1) żądanie  ---->                         (2) zapytanie SQL ---->
+------------------+                             +----------------------+                   +------------------+
| Klient           |                             | Serwer aplikacji     |                   | Baza danych      |
|                  |                             |                      |                   |                  |
| Przeglądarka lub |   HTTP / HTTPS              | Przyjmuje żądanie,   |   SQL             | Przechowuje dane |
| inna aplikacja   | --------------------------> | wykonuje logikę      | -----------------> | i zwraca wynik   |
| użytkownika.     |                             | biznesową i buduje   |                   | zapytania.       |
| Wysyła żądanie,  | <-------------------------- | odpowiedź.           | <----------------- |                  |
| odbiera wynik.   |   odpowiedź                 |                      |   wiersze / wynik |                  |
+------------------+                             +----------------------+                   +------------------+
        <---- (4) odpowiedź                        <---- (3) wynik zapytania

Kierunek przepływu:
  (1) Klient  -->  Serwer aplikacji     żądanie użytkownika (HTTP/HTTPS)
  (2) Serwer  -->  Baza danych          zapytanie SQL
  (3) Baza    -->  Serwer aplikacji     wynik zapytania
  (4) Serwer  -->  Klient               gotowa odpowiedź
```
