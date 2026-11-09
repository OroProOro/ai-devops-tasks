
# Zadanie 29 – Jenkins Configuration as Code (JCasC)

## 1. Cel zadania

Celem zadania było przygotowanie konfiguracji Jenkins Configuration as Code w formacie YAML.

JCasC pozwala automatycznie konfigurować serwer Jenkins bez konieczności ręcznego ustawiania wszystkich parametrów w panelu administratora.

## 2. Plik jenkins-casc.yaml

Plik zawiera konfigurację:

- Podstawowych ustawień Jenkins.
- Liczby wykonawców.
- Globalnych zmiennych środowiskowych.
- Narzędzi Maven i Node.js.
- Przykładowego zadania Pipeline.
- Adresu serwera Jenkins.

## 3. Wykorzystane wtyczki

W projekcie wykorzystano następujące wtyczki:

1. configuration-as-code – konfiguracja Jenkins przez YAML.
2. workflow-aggregator – obsługa pipeline.
3. git – integracja z repozytorium Git.
4. pipeline-stage-view – wizualizacja etapów pipeline.
5. job-dsl – tworzenie zadań przez kod.
6. maven-plugin – obsługa Maven.
7. nodejs – obsługa Node.js.
8. docker-workflow – integracja pipeline z Docker.

Wtyczki instalowane są osobno za pomocą pliku plugins.txt.

## 4. Instalacja Jenkinsa

Do uruchomienia wykorzystano Docker i Docker Compose.

Wymagane elementy:

- Docker Desktop lub Docker Engine.
- Docker Compose.
- Plik Dockerfile.
- Plik docker-compose.yml.
- Plik plugins.txt.
- Plik jenkins-casc.yaml.

## 5. Uruchomienie

Budowanie obrazu:

docker compose build

Uruchomienie kontenera:

docker compose up -d

Sprawdzenie działania:

docker ps

Wyświetlenie logów:

docker logs jenkins

Jenkins dostępny jest pod adresem:

http://localhost:8080

## 6. Zastosowanie zmiennej CASC_JENKINS_CONFIG

Zmienna CASC_JENKINS_CONFIG wskazuje lokalizację pliku konfiguracyjnego YAML.

W projekcie ustawiono:

CASC_JENKINS_CONFIG=/var/jenkins_home/casc_configs/jenkins-casc.yaml

Dzięki temu Jenkins automatycznie odczytuje konfigurację podczas uruchamiania.

## 7. Konfiguracja narzędzi

Maven i Node.js można definiować w sekcji tool pliku YAML.

Docker wymaga dodatkowo instalacji odpowiedniego środowiska na agencie Jenkins.

Sam wpis w konfiguracji JCasC nie instaluje silnika Docker.

## 8. Korzyści z JCasC

- Automatyzacja konfiguracji Jenkins.
- Łatwiejsze odtwarzanie środowiska.
- Możliwość przechowywania konfiguracji w Git.
- Ograniczenie ręcznych czynności administracyjnych.
- Powtarzalność konfiguracji.
- Łatwiejsze zarządzanie wieloma instancjami Jenkins.

## 9. Podsumowanie

Jenkins Configuration as Code pozwala zarządzać konfiguracją serwera Jenkins za pomocą plików YAML.

Połączenie JCasC z Docker i Docker Compose ułatwia przygotowanie powtarzalnego środowiska CI/CD.

Dzięki temu administrator może szybciej odtworzyć konfigurację Jenkins i kontrolować jej zmiany za pomocą systemu kontroli wersji.
