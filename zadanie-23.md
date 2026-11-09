
# Zadanie 23 – Analiza i optymalizacja algorytmu findPairs

## 1. Cel zadania

Celem zadania było przeanalizowanie algorytmu findPairs, określenie jego złożoności czasowej i pamięciowej oraz przygotowanie zoptymalizowanej wersji.

Algorytm wyszukuje pary liczb w tablicy, których suma jest równa podanej wartości targetSum.

## 2. Analiza oryginalnego algorytmu

Oryginalny algorytm wykorzystuje dwie zagnieżdżone pętle for.

### Złożoność czasowa

O(n²)

Każdy element tablicy jest porównywany z pozostałymi elementami. Liczba operacji rośnie kwadratowo wraz z rozmiarem tablicy.

### Złożoność pamięciowa

- Pamięć pomocnicza: O(1).
- Pamięć na wynik: O(k).

W najgorszym przypadku liczba znalezionych par może wynosić O(n²).

## 3. Zastosowana optymalizacja

W zoptymalizowanej wersji wykorzystano strukturę Map.

Zamiast porównywać wszystkie elementy ze sobą, algorytm:

1. Przechowuje wcześniej napotkane liczby w Map.
2. Oblicza dopełnienie aktualnej liczby do targetSum.
3. Sprawdza, czy dopełnienie znajduje się już w Map.
4. Dodaje znalezione pary do tablicy wynikowej.
5. Zapisuje aktualną liczbę i zwiększa licznik jej wystąpień.

### Złożoność czasowa

O(n + k) średnio, gdzie:
- n – liczba elementów tablicy.
- k – liczba znalezionych par.

### Złożoność pamięciowa

- Pamięć pomocnicza: O(u).
- Pamięć na wynik: O(k).

Gdzie u oznacza liczbę różnych wartości w tablicy.

## 4. Porównanie algorytmów

| Właściwość | Oryginalny | Zoptymalizowany |
|---|---|---|
| Złożoność czasowa | O(n²) | O(n + k) |
| Pamięć pomocnicza | O(1) | O(u) |
| Pamięć na wynik | O(k) | O(k) |
| Struktura danych | Tablica | Map |
| Zagnieżdżone pętle | Tak | Nie |

## 5. Przykład użycia

```javascript
const findPairs = require("./find-pairs-optimized");

const numbers = [2, 7, 4, 5, 3, 8];
const targetSum = 10;

const result = findPairs(numbers, targetSum);

console.log(result);
```

### Oczekiwany wynik

```javascript
[
  [2, 8],
  [7, 3],
  [5, 5]
]
```

Uwaga: w powyższym przykładzie liczba 5 występuje tylko raz, dlatego para [5, 5] nie zostanie zwrócona. Prawidłowy wynik to:

```javascript
[
  [2, 8],
  [7, 3]
]
```

## 6. Korzyści z optymalizacji

1. Znaczne zmniejszenie liczby operacji dla dużych tablic.
2. Szybsze wyszukiwanie pasujących liczb dzięki Map.
3. Brak konieczności stosowania dwóch zagnieżdżonych pętli.
4. Obsługa powtarzających się wartości.
5. Lepsza skalowalność rozwiązania.

## 7. Ograniczenia

Zoptymalizowany algorytm wykorzystuje dodatkową pamięć na strukturę Map.

Ponadto kolejność zwracanych par może różnić się od kolejności w oryginalnym algorytmie.

Jeżeli liczba znalezionych par jest bardzo duża, samo zapisanie wyników może wymagać O(n²) pamięci.

## 8. Podsumowanie

Oryginalny algorytm ma złożoność czasową O(n²), ponieważ sprawdza wszystkie możliwe pary elementów.

Zoptymalizowana wersja wykorzystuje Map i osiąga średnią złożoność O(n + k).

Jest to korzystniejsze rozwiązanie dla dużych zbiorów danych, szczególnie gdy liczba znalezionych par jest niewielka.
```
