
# Zadanie 17 – Filtrowanie i sortowanie zadań

## 1. Opis rozwiązania

Utworzono funkcję JavaScript `getCompletedTaskTitles`, która przetwarza tablicę obiektów reprezentujących zadania.

Każde zadanie zawiera trzy pola:
- `id` – identyfikator zadania,
- `title` – tytuł zadania,
- `status` – status zadania.

## 2. Działanie funkcji

Funkcja wykonuje trzy operacje:

1. **Filter** – wybiera wyłącznie zadania, których status wynosi `completed`.
2. **Sort** – sortuje wybrane zadania według identyfikatora ID w kolejności rosnącej.
3. **Map** – pobiera same tytuły z posortowanych zadań i zwraca je w postaci tablicy.

## 3. Przykład użycia

```javascript
const getCompletedTaskTitles = require("./task-filter");

const tasks = [
    { id: 3, title: "Testowanie aplikacji", status: "completed" },
    { id: 1, title: "Przygotowanie projektu", status: "completed" },
    { id: 2, title: "Tworzenie interfejsu", status: "in-progress" },
    { id: 4, title: "Dokumentacja", status: "completed" },
    { id: 5, title: "Poprawki", status: "pending" }
];

const result = getCompletedTaskTitles(tasks);

console.log(result);
```

## 4. Oczekiwany wynik

```javascript
[
    "Przygotowanie projektu",
    "Testowanie aplikacji",
    "Dokumentacja"
]
```

## 5. Korzyści zastosowanego rozwiązania

- Czytelny i krótki kod.
- Wykorzystanie metod tablicowych JavaScript.
- Automatyczne sortowanie zadań według ID.
- Zwracanie wyłącznie potrzebnych danych.
- Możliwość ponownego wykorzystania funkcji w różnych częściach aplikacji.

## 6. Podsumowanie

Funkcja `getCompletedTaskTitles` pozwala w prosty sposób wyodrębnić ukończone zadania, uporządkować je według identyfikatora i pobrać ich tytuły.

Rozwiązanie wykorzystuje metody `filter()`, `sort()` oraz `map()`.
