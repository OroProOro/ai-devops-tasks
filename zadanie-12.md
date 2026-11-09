# Zadanie 12 — optymalizacja `find_duplicates`

## Oryginalna funkcja

```python
def find_duplicates(list_of_items):
    duplicates = []
    for i in range(len(list_of_items)):
        for j in range(i + 1, len(list_of_items)):
            if list_of_items[i] == list_of_items[j] and list_of_items[i] not in duplicates:
                duplicates.append(list_of_items[i])
    return duplicates
```

**Pytanie:** Czy ten kod można zoptymalizować? Jeśli tak, zaproponuj bardziej wydajną wersję.

**Odpowiedź:** Tak. Funkcja zwraca wartości, które występują w liście więcej niż raz, w kolejności pierwszego powtórzenia. Wynik jest poprawny, ale sposób szukania jest wolny.

## Dlaczego oryginał jest wolny

Dla listy o długości `n` zewnętrzna pętla wykonuje się `n` razy, a wewnętrzna — średnio około `n/2` razy. Każda para elementów jest porównywana, więc samych porównań jest rzędu **O(n²)**.

Dodatkowy koszt siedzi w warunku `list_of_items[i] not in duplicates`. Operator `in` na liście przegląda ją od początku, czyli w czasie liniowym względem liczby już znalezionych duplikatów. Przy wielu powtórzeniach ten przegląd dokłada się do podwójnej pętli.

Pamięć na samą listę wyników jest niewielka (co najwyżej jedna pozycja na unikalną powtórzoną wartość), ale czas rośnie z kwadratem długości wejścia. Dla tysięcy elementów różnica jest już odczuwalna, dla dziesiątek tysięcy — wyraźna.

## Zoptymalizowana wersja

Jeden przebieg listy. Zbiór `seen` pamięta wartości już spotkane, a lista `duplicates` zbiera tylko te, które pojawiły się ponownie. Drugi zbiór pilnuje, żeby ta sama wartość nie trafiła do wyniku więcej niż raz, i sprawdzenie w zbiorze jest średnio **O(1)**.

```python
def find_duplicates(list_of_items):
    seen = set()
    already_reported = set()
    duplicates = []
    for item in list_of_items:
        if item in seen:
            if item not in already_reported:
                already_reported.add(item)
                duplicates.append(item)
        else:
            seen.add(item)
    return duplicates
```

Kolejność wyniku jest taka sama jak w oryginale: wartość trafia na listę przy drugim wystąpieniu, nie przy pierwszym.

`collections.Counter` też przechodzi dane raz, ale układa wynik według pierwszego wystąpienia, nie według pierwszego powtórzenia. Dla `[1, 2, 3, 2, 1]` oryginał zwraca `[2, 1]`, a `Counter` — `[1, 2]`. Dlatego wariant poniżej jest dobry tylko wtedy, gdy kolejność nie ma znaczenia:

```python
from collections import Counter

def find_duplicates(list_of_items):
    counts = Counter(list_of_items)
    return [item for item, count in counts.items() if count > 1]
```

Wersja ze zbiorami nie wymaga importu, jest liniowa i oddaje duplikat dokładnie w momencie drugiego wystąpienia — tak jak oryginał.

## Co się poprawiło

| | Oryginał | Wersja ze zbiorami |
|---|---|---|
| Czas | O(n²) — każda para | O(n) — jeden przebieg |
| Sprawdzenie „czy już zgłoszone” | O(k) na liście | O(1) średnio w zbiorze |
| Pamięć dodatkowa | lista wyników | O(n) na zbiór wartości |
| Kolejność wyniku | pierwsze powtórzenie | taka sama |

Zysk czasowy bierze się z zamiany zagnieżdżonych pętli na jedno przejście i ze zbioru haszującego zamiast liniowego `in` na liście. Dodatkowa pamięć rośnie liniowo z liczbą unikalnych wartości — dla typowych list to uczciwa wymiana za spadek z kwadratu do linii.

## Ograniczenie

Zbiór i `Counter` wymagają elementów haszowalnych (`int`, `str`, `tuple` i podobne). Oryginał działa też dla list zagnieżdżonych i innych obiektów porównywalnych przez `==`, których nie da się włożyć do zbioru. Dla takich danych zostaje algorytm kwadratowy albo najpierw trzeba sprowadzić elementy do postaci haszowalnej.

## Krótki sprawdzian

```python
assert find_duplicates([1, 2, 3, 2, 1, 4, 1]) == [2, 1]
assert find_duplicates([1, 2, 3]) == []
assert find_duplicates([]) == []
assert find_duplicates(["a", "b", "a", "b"]) == ["a", "b"]
```

`2` wraca przed `1`, bo drugie wystąpienie `2` jest wcześniejsze niż drugie wystąpienie `1`.
