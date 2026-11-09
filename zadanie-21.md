
# Zadanie 21 – Konwersja danych JSON do CSV

## 1. Cel zadania

Celem zadania było przekształcenie danych użytkowników zapisanych w formacie JSON do formatu CSV.

Dane zawierają informacje o użytkownikach:
- id – identyfikator użytkownika,
- name – imię i nazwisko,
- email – adres poczty elektronicznej,
- roles – tablica ról użytkownika.

## 2. Proces konwersji

Konwersja polegała na wykonaniu następujących czynności:

1. Odczytanie danych z pliku users.json.
2. Pobranie tablicy użytkowników znajdującej się w polu users.
3. Utworzenie nagłówków CSV: id, name, email, roles.
4. Przekształcenie każdego obiektu użytkownika w jeden wiersz CSV.
5. Zamiana tablicy roles na tekst, w którym poszczególne role oddzielono średnikiem.
6. Zapisanie wynikowych danych w pliku users.csv.

## 3. Wynik konwersji

```csv
id,name,email,roles
1,Jan Kowalski,jan@example.com,admin;user
2,Anna Nowak,anna@example.com,user
```

## 4. Potencjalne wyzwania podczas konwersji

### 4.1. Tablice w formacie CSV

JSON obsługuje tablice, natomiast CSV nie posiada bezpośredniego odpowiednika tego typu danych.

W tym przykładzie zastosowano średnik jako separator ról.

Przykład:

- JSON: ["admin", "user"]
- CSV: admin;user

Innym rozwiązaniem byłoby zapisanie tablicy jako tekstu JSON wewnątrz jednej komórki CSV.

### 4.2. Znaki specjalne

Wartości zawierające przecinki, cudzysłowy lub znaki nowej linii wymagają odpowiedniego cytowania.

Przykład:

```csv
id,name,email,roles
1,"Kowalski, Jan",jan@example.com,admin;user
```

### 4.3. Brakujące wartości

W przypadku braku danych w JSON należy ustalić sposób ich reprezentacji w CSV, np. pozostawić pustą komórkę.

### 4.4. Kodowanie znaków

Należy stosować kodowanie UTF-8, aby poprawnie zapisywać polskie znaki, takie jak ą, ę, ł, ś i ż.

### 4.5. Zagnieżdżone obiekty

CSV jest formatem tabelarycznym, dlatego zagnieżdżone struktury JSON wymagają spłaszczenia lub zamiany na tekst.

## 5. Porównanie JSON i CSV

| Cecha | JSON | CSV |
|---|---|---|
| Struktura | Obiektowa | Tabelaryczna |
| Tablice | Obsługiwane | Brak natywnej obsługi |
| Zagnieżdżenia | Obsługiwane | Brak natywnej obsługi |
| Czytelność | Dobra dla struktur danych | Dobra dla tabel |
| Zastosowanie | API i aplikacje | Arkusze kalkulacyjne i analiza danych |

## 6. Podsumowanie

Konwersja JSON do CSV umożliwia łatwiejsze przeglądanie danych użytkowników w arkuszach kalkulacyjnych.

Największym wyzwaniem jest reprezentowanie struktur złożonych, takich jak tablice i obiekty.

W tym zadaniu tablica roles została zamieniona na tekst z separatorami średnikowymi.

Dzięki temu zachowano wszystkie informacje o rolach użytkowników w jednej kolumnie CSV.
