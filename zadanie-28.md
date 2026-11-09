
# Zadanie 28 – Skrypt Python do zarządzania Jenkins

## 1. Cel zadania

Celem zadania było stworzenie skryptu Python umożliwiającego komunikację z serwerem Jenkins za pomocą REST API.

Skrypt pozwala na:
- Wyświetlanie wszystkich zadań Jenkins.
- Sprawdzanie statusu ostatnich buildów.
- Uruchamianie wybranego zadania.
- Uwierzytelnianie użytkownika.
- Obsługę błędów komunikacji.

## 2. Wykorzystane biblioteki

### requests

Biblioteka służy do wykonywania żądań HTTP GET i POST.

Umożliwia komunikację z Jenkins REST API.

### requests.auth

Odpowiada za uwierzytelnianie HTTP Basic Auth przy użyciu loginu i API Token.

### argparse

Pozwala przekazywać argumenty do skryptu z poziomu terminala.

### os

Umożliwia odczytywanie zmiennych środowiskowych zawierających konfigurację Jenkins.

### sys

Służy do obsługi błędów i kończenia działania programu.

## 3. Opis działania skryptu

### 3.1. Klasa JenkinsManager

Klasa odpowiada za komunikację z serwerem Jenkins.

Przyjmuje trzy parametry:
- URL serwera.
- Nazwę użytkownika.
- API Token.

### 3.2. Metoda request()

Odpowiada za wysyłanie żądań HTTP do Jenkins API.

Obsługuje:
- Błędy HTTP.
- Problemy z połączeniem.
- Przekroczenie czasu oczekiwania.
- Inne błędy żądań.

### 3.3. Metoda list_jobs()

Pobiera listę wszystkich zadań Jenkins.

Wykorzystuje endpoint:

GET /api/json

Wyświetla nazwę zadania, kolor statusu i adres URL.

### 3.4. Metoda get_build_status()

Sprawdza informacje o ostatnim buildzie wybranego zadania.

Wyświetla:
- Numer buildu.
- Wynik wykonania.
- Adres buildu.

### 3.5. Metoda run_job()

Uruchamia wskazane zadanie za pomocą żądania HTTP POST.

Wykorzystuje endpoint:

POST /job/NAZWA/build

### 3.6. Funkcja main()

Odpowiada za obsługę argumentów przekazywanych podczas uruchamiania programu.

Dostępne akcje:

- list – wyświetlanie zadań.
- status – sprawdzanie statusu buildu.
- run – uruchamianie zadania.

## 4. Konfiguracja środowiska

Do działania skryptu wymagane są:

- Python 3.
- Biblioteka requests.
- Działający serwer Jenkins.
- Konto użytkownika Jenkins.
- API Token.

Instalacja biblioteki:

pip install requests

Wymagane zmienne środowiskowe:

JENKINS_URL
JENKINS_USER
JENKINS_TOKEN

## 5. Przykładowe użycie

### Wyświetlanie zadań

python jenkins-manager.py list

### Sprawdzanie statusu

python jenkins-manager.py status --job Simple-Node-API

### Uruchamianie zadania

python jenkins-manager.py run --job Simple-Node-API

## 6. Obsługa błędów

Skrypt obsługuje następujące sytuacje:

- Brak połączenia z serwerem Jenkins.
- Nieprawidłowe dane logowania.
- Przekroczenie czasu oczekiwania.
- Błędy HTTP.
- Brak wskazanego zadania.
- Brak wymaganych zmiennych środowiskowych.
- Brak ostatniego buildu.

## 7. Bezpieczeństwo

Podczas korzystania ze skryptu należy pamiętać o kilku zasadach:

1. Nie przechowywać API Token bezpośrednio w kodzie.
2. Korzystać ze zmiennych środowiskowych lub bezpiecznego magazynu sekretów.
3. Stosować HTTPS zamiast nieszyfrowanego HTTP.
4. Przyznawać użytkownikowi tylko niezbędne uprawnienia Jenkins.
5. Regularnie odnawiać tokeny API.
6. Nie udostępniać tokenów w repozytorium Git.

## 8. Podsumowanie

Skrypt jenkins-manager.py umożliwia podstawowe zarządzanie zadaniami Jenkins z poziomu terminala.

Dzięki wykorzystaniu Python i REST API można automatyzować operacje administracyjne bez konieczności ręcznego korzystania z interfejsu przeglądarkowego Jenkins.

Rozwiązanie może być rozwijane o dodatkowe funkcje, takie jak:
- Pobieranie historii buildów.
- Zatrzymywanie wykonywanych buildów.
- Wyświetlanie logów.
- Usuwanie zadań.
- Monitorowanie pipeline CI/CD.
