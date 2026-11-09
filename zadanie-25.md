
# Zadanie 25 – Jenkins Pipeline dla aplikacji Node.js

## 1. Cel zadania

Celem zadania było utworzenie deklaratywnego Jenkinsfile automatyzującego proces CI/CD dla aplikacji Node.js.

Pipeline obejmuje pobieranie kodu, instalację zależności, testowanie, budowanie aplikacji oraz publikowanie obrazu Docker.

## 2. Opis poszczególnych etapów

### 2.1. Checkout

Etap odpowiada za pobranie kodu źródłowego z repozytorium Git.

Wykorzystuje instrukcję:

`checkout scm`

Dzięki temu Jenkins pobiera kod z repozytorium powiązanego z aktualnym uruchomieniem pipeline.

### 2.2. Install Dependencies

Etap instaluje zależności projektu za pomocą polecenia:

`npm install`

Biblioteki są pobierane zgodnie z konfiguracją package.json.

### 2.3. Run Tests

Etap uruchamia testy automatyczne:

`npm test`

Pozwala wykryć błędy przed zbudowaniem i opublikowaniem aplikacji.

Jeżeli testy zakończą się niepowodzeniem, kolejne etapy nie zostaną wykonane.

### 2.4. Build Application

Etap buduje aplikację za pomocą:

`npm run build`

Polecenie wykonuje skrypt build zdefiniowany w package.json.

### 2.5. Build Docker Image

Etap tworzy obraz Docker:

`docker build -t $DOCKER_IMAGE:$DOCKER_TAG .`

Obraz otrzymuje nazwę oraz tag odpowiadający numerowi buildu Jenkins.

### 2.6. Push Docker Image

Etap publikuje obraz w Docker Hub.

Wykorzystuje:
- docker.withRegistry()
- docker.image()
- push()

Dane logowania pobierane są z Jenkins Credentials.

Obraz publikowany jest z tagiem numeru buildu oraz latest.

### 2.7. Post

Sekcja post obsługuje zakończenie pipeline.

- success – informuje o poprawnym zakończeniu.
- failure – informuje o wystąpieniu błędu.
- always – wykonuje się niezależnie od wyniku.

## 3. Najlepsze praktyki tworzenia pipeline'ów Jenkins

1. Bezpieczne przechowywanie danych logowania w Jenkins Credentials.
2. Uruchamianie testów przed publikacją aplikacji.
3. Stosowanie unikalnych tagów obrazów Docker.
4. Podział pipeline na czytelne i niezależne etapy.
5. Monitorowanie logów i błędów.
6. Ograniczanie uprawnień agentów Jenkins.
7. Stosowanie npm ci dla powtarzalnych instalacji zależności.
8. Regularne aktualizowanie narzędzi i wtyczek Jenkins.

## 4. Korzyści z zastosowania Jenkins Pipeline

- Automatyzacja procesu budowania aplikacji.
- Szybsze wykrywanie błędów.
- Powtarzalność procesu wdrażania.
- Łatwiejsze zarządzanie obrazami Docker.
- Ograniczenie ręcznych czynności programisty.
- Większa kontrola nad jakością kodu.

## 5. Wymagania do uruchomienia

Przed uruchomieniem pipeline należy przygotować:

- Jenkins.
- Node.js i npm.
- Docker.
- Docker Pipeline Plugin.
- Repozytorium Git.
- Konto Docker Hub.
- Jenkins Credentials o identyfikatorze docker-hub-credentials.
- Plik package.json zawierający skrypty test i build.
- Plik Dockerfile.

## 6. Podsumowanie

Utworzony Jenkinsfile automatyzuje podstawowy proces CI/CD dla aplikacji Node.js.

Dzięki zastosowaniu deklaratywnej składni Jenkins Pipeline konfiguracja jest czytelna i łatwa do rozbudowy.

Pipeline umożliwia automatyczne pobieranie kodu, instalację zależności, testowanie, budowanie aplikacji i publikowanie obrazu Docker.

Zastosowanie dobrych praktyk zwiększa bezpieczeństwo, niezawodność i powtarzalność procesu dostarczania oprogramowania.
