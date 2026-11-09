
# Zadanie 15 – Refaktoryzacja funkcji getEnvironmentConfig

## 1. Cel refaktoryzacji

Celem zadania było poprawienie czytelności i ułatwienie utrzymania funkcji getEnvironmentConfig, która zwraca konfigurację dla różnych środowisk aplikacji.

## 2. Wprowadzone zmiany

- Zastąpiono instrukcje warunkowe if/else jednym obiektem environmentConfigs.
- Każde środowisko (development, testing, staging, production) posiada własną konfigurację.
- Zastosowano operator ||, aby ustawić domyślną konfigurację development w przypadku nieznanego środowiska.
- Zastosowano operator spread (...), aby zwracać kopię konfiguracji zamiast bezpośredniego odwołania do obiektu.

## 3. Korzyści z refaktoryzacji

1. Czytelność kodu – konfiguracje wszystkich środowisk znajdują się w jednym miejscu.
2. Łatwiejsze utrzymanie – zmiana parametrów środowiska nie wymaga modyfikowania instrukcji warunkowych.
3. Łatwiejsze rozszerzanie – dodanie nowego środowiska wymaga jedynie dodania kolejnego wpisu w obiekcie.
4. Mniejsza złożoność – ograniczono liczbę instrukcji warunkowych.
5. Bezpieczeństwo danych – zwracanie kopii konfiguracji zapobiega przypadkowej modyfikacji oryginalnych ustawień.

## 4. Podsumowanie

Refaktoryzacja sprawiła, że funkcja getEnvironmentConfig jest krótsza, bardziej przejrzysta i łatwiejsza w dalszym rozwijaniu.

Zastosowanie obiektu konfiguracyjnego pozwala wygodniej zarządzać ustawieniami różnych środowisk aplikacji.
