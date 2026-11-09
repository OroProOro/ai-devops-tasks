
# Zadanie 27 – Diagram pipeline CI/CD w Jenkins

## 1. Cel zadania

Celem zadania było przygotowanie diagramu Mermaid przedstawiającego typowy pipeline CI/CD w Jenkins dla aplikacji webowej.

Diagram pokazuje kolejne etapy automatyzacji procesu tworzenia, testowania i wdrażania aplikacji.

## 2. Opis etapów pipeline

### 2.1. Checkout kodu

Jenkins pobiera kod źródłowy z repozytorium Git.

Dzięki temu pipeline pracuje na aktualnej wersji aplikacji.

### 2.2. Budowanie aplikacji

Następuje instalacja wymaganych zależności oraz kompilacja aplikacji.

Na tym etapie wykrywane są również podstawowe błędy budowania.

### 2.3. Testowanie

Uruchamiane są testy jednostkowe sprawdzające poprawność poszczególnych funkcjonalności.

Jeżeli testy zakończą się niepowodzeniem, pipeline zostaje zatrzymany.

### 2.4. Analiza statyczna kodu

Kod jest analizowany bez uruchamiania aplikacji.

Można wykorzystać narzędzia takie jak:
- SonarQube.
- ESLint.
- Checkstyle.

Celem jest wykrywanie błędów, nieprawidłowych wzorców i problemów jakościowych.

### 2.5. Analiza bezpieczeństwa

Na tym etapie sprawdzane są potencjalne zagrożenia bezpieczeństwa.

Przykładowe działania:
- Skanowanie zależności.
- Wykrywanie znanych podatności.
- Sprawdzanie konfiguracji aplikacji.
- Wyszukiwanie przypadkowo zapisanych sekretów.

### 2.6. Budowanie obrazu Docker

Po pomyślnym przejściu wcześniejszych kontroli tworzony jest obraz Docker.

Obraz zawiera aplikację oraz środowisko niezbędne do jej uruchomienia.

### 2.7. Testy integracyjne

Sprawdzana jest współpraca poszczególnych komponentów aplikacji.

Przykładowo:
- Komunikacja z bazą danych.
- Działanie endpointów API.
- Integracja z zewnętrznymi usługami.

Niepowodzenie testów blokuje wdrożenie.

### 2.8. Wdrożenie na staging

Aplikacja zostaje wdrożona na środowisko testowe staging.

Środowisko to powinno możliwie wiernie odwzorowywać produkcję.

### 2.9. Testy akceptacyjne

Na staging przeprowadzane są testy sprawdzające, czy aplikacja spełnia wymagania funkcjonalne.

Pozytywny wynik pozwala przejść do zatwierdzenia wdrożenia.

### 2.10. Wdrożenie na production

Po zatwierdzeniu wdrożenia aplikacja trafia na środowisko produkcyjne.

Następnie wykonywana jest weryfikacja poprawności działania aplikacji.

## 3. Zależności między etapami

Pipeline działa według określonej kolejności:

1. Checkout dostarcza kod źródłowy.
2. Budowanie przygotowuje aplikację.
3. Testy jednostkowe sprawdzają poprawność kodu.
4. Analiza statyczna kontroluje jakość kodu.
5. Analiza bezpieczeństwa wykrywa zagrożenia.
6. Budowanie Docker przygotowuje obraz aplikacji.
7. Testy integracyjne sprawdzają współpracę komponentów.
8. Staging umożliwia sprawdzenie aplikacji przed produkcją.
9. Testy akceptacyjne potwierdzają poprawność działania.
10. Production udostępnia aplikację użytkownikom.

Jeżeli którykolwiek z obowiązkowych etapów zakończy się błędem, dalsze wdrożenie zostaje zablokowane.

## 4. Znaczenie decyzji warunkowych

W diagramie zastosowano trzy główne punkty decyzyjne:

- Kontrola jakości i bezpieczeństwa – decyduje o możliwości budowania obrazu Docker.
- Testy integracyjne – decydują o możliwości wdrożenia na staging.
- Akceptacja wdrożenia – decyduje o publikacji aplikacji na production.

Dzięki temu błędna lub niebezpieczna wersja aplikacji nie powinna trafić na środowisko produkcyjne.

## 5. Korzyści z zastosowania pipeline CI/CD

- Automatyzacja procesu wdrażania.
- Szybsze wykrywanie błędów.
- Poprawa jakości kodu.
- Zwiększenie bezpieczeństwa aplikacji.
- Powtarzalność procesu budowania.
- Ograniczenie liczby błędów ludzkich.
- Łatwiejsze zarządzanie wersjami aplikacji.

## 6. Podsumowanie

Diagram przedstawia typowy proces CI/CD realizowany za pomocą Jenkins.

Każdy etap ma określoną funkcję i zależy od powodzenia wcześniejszych etapów.

Najważniejszą zaletą takiego rozwiązania jest możliwość automatycznego sprawdzania jakości i bezpieczeństwa aplikacji przed jej wdrożeniem na środowisko produkcyjne.
