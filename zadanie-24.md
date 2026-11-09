
# Zadanie 24 – Analiza wydajności serwera API

## 1. Dane wydajnościowe

Metryki serwera API z ostatnich 24 godzin:

| Metryka | Wartość |
|---|---:|
| Średni czas odpowiedzi | 230 ms |
| P95 czasu odpowiedzi | 450 ms |
| P99 czasu odpowiedzi | 1200 ms |
| Liczba zapytań | 15 000 |
| Liczba błędów 5xx | 120 |
| Średnie użycie CPU | 45% |
| Maksymalne użycie CPU | 80% |
| Średnie użycie RAM | 2,1 GB |
| Maksymalne użycie RAM | 3,5 GB |
| Dostępna pamięć RAM | 4 GB |

## 2. Interpretacja danych

### 2.1. Czas odpowiedzi

Średni czas odpowiedzi wynosi 230 ms, co można uznać za umiarkowanie dobry wynik.

95. percentyl wynosi 450 ms, co oznacza, że 95% zapytań otrzymuje odpowiedź w czasie nieprzekraczającym tej wartości.

99. percentyl wynosi 1200 ms. Oznacza to, że niewielka część zapytań trwa znacznie dłużej.

Może to wskazywać na problemy z wydajnością niektórych endpointów lub zapytań do bazy danych.

### 2.2. Błędy HTTP 5xx

Liczba błędów serwera wynosi 120 na 15 000 zapytań.

Obliczenie procentowego udziału błędów:

120 / 15000 * 100 = 0,8%

Oznacza to, że 0,8% zapytań kończy się błędem serwera.

Należy sprawdzić logi aplikacji i ustalić przyczynę problemów.

### 2.3. Użycie CPU

Średnie użycie CPU wynosi 45%, a maksymalne 80%.

Procesor nie jest stale przeciążony, jednak okresowe wzrosty wykorzystania mogą wskazywać na kosztowne operacje lub zwiększony ruch.

### 2.4. Użycie pamięci RAM

Średnie użycie pamięci wynosi 2,1 GB, natomiast maksymalne 3,5 GB z dostępnych 4 GB.

Maksymalne wykorzystanie pamięci wynosi:

3,5 / 4 * 100 = 87,5%

Pozostaje jedynie 0,5 GB wolnej pamięci.

Jest to potencjalne zagrożenie dla stabilności aplikacji.

## 3. Potencjalne problemy

1. Wysoki czas odpowiedzi dla 1% najwolniejszych zapytań.
2. Występowanie błędów HTTP 5xx.
3. Ryzyko wyczerpania dostępnej pamięci RAM.
4. Okresowe wysokie wykorzystanie CPU.
5. Możliwe nieefektywne zapytania do bazy danych.

## 4. Propozycje poprawy wydajności

### 4.1. Optymalizacja pamięci

- Analiza wykorzystania pamięci przez aplikację.
- Wykrywanie wycieków pamięci.
- Optymalizacja przechowywania dużych obiektów.
- Monitorowanie działania garbage collectora.

### 4.2. Analiza błędów

- Analiza logów serwera.
- Sprawdzanie wyjątków aplikacji.
- Monitorowanie timeoutów.
- Dodanie odpowiedniego mechanizmu obsługi błędów.

### 4.3. Optymalizacja bazy danych

- Dodanie odpowiednich indeksów.
- Analiza wolnych zapytań.
- Ograniczenie pobierania niepotrzebnych danych.
- Wykorzystanie connection poolingu.

### 4.4. Wprowadzenie cache

Wykorzystanie Redis pozwoli ograniczyć liczbę zapytań do bazy danych i przyspieszyć pobieranie często wykorzystywanych danych.

### 4.5. Testy obciążeniowe

Należy wykonywać testy obciążeniowe, aby sprawdzić zachowanie aplikacji przy zwiększonej liczbie użytkowników.

Można wykorzystać narzędzia takie jak:
- Apache JMeter.
- k6.
- Artillery.

## 5. Priorytety działań

| Priorytet | Działanie |
|---|---|
| Wysoki | Analiza zużycia pamięci RAM |
| Wysoki | Analiza błędów 5xx |
| Wysoki | Optymalizacja wolnych zapytań |
| Średni | Wprowadzenie Redis |
| Średni | Profilowanie CPU |
| Średni | Testy obciążeniowe |
| Niski | Dalsza optymalizacja infrastruktury |

## 6. Podsumowanie

Serwer API działa stosunkowo poprawnie, jednak dane wskazują na kilka obszarów wymagających poprawy.

Największym problemem jest wysokie maksymalne wykorzystanie pamięci RAM, które wynosi 87,5%.

Dodatkowo należy przeanalizować błędy 5xx oraz wolne zapytania, ponieważ mogą one negatywnie wpływać na doświadczenie użytkowników.

Najważniejsze działania to optymalizacja pamięci, analiza logów, poprawa wydajności bazy danych i wprowadzenie monitorowania.

Regularna analiza metryk pozwoli zwiększyć stabilność, szybkość i niezawodność serwera API.
