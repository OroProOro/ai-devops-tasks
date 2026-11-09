
# Simple Task API

REST API do zarządzania zadaniami, stworzone przy użyciu Node.js, Express i MongoDB.

## 1. Opis projektu

Simple Task API to prosta aplikacja backendowa umożliwiająca zarządzanie zadaniami za pomocą interfejsu REST API.

Projekt pozwala użytkownikom tworzyć, odczytywać, aktualizować i usuwać zadania.

### Główne funkcjonalności

- Tworzenie nowych zadań.
- Pobieranie listy wszystkich zadań.
- Pobieranie szczegółów pojedynczego zadania.
- Aktualizowanie istniejących zadań.
- Usuwanie zadań.
- Filtrowanie zadań według statusu i priorytetu.
- Podstawowa autoryzacja użytkowników.

### Technologie

- Node.js – środowisko uruchomieniowe JavaScript.
- Express.js – framework do tworzenia API.
- MongoDB – nierelacyjna baza danych.
- Mongoose – biblioteka do obsługi MongoDB.

## 2. Instalacja

### Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane:

- Node.js (zalecana wersja LTS).
- npm.
- MongoDB (lokalnie lub MongoDB Atlas).
- Git.

### Krok 1. Pobranie projektu

```bash
git clone https://github.com/username/simple-task-api.git
cd simple-task-api
```

### Krok 2. Instalacja zależności

```bash
npm install
```

### Krok 3. Konfiguracja zmiennych środowiskowych

Utwórz plik `.env` w głównym katalogu projektu:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/simple-task-api
JWT_SECRET=your_secret_key
```

Uwaga: Powyższe wartości są przykładowe. W środowisku produkcyjnym należy używać bezpiecznego sekretu JWT.

### Krok 4. Uruchomienie aplikacji

```bash
npm start
```

Tryb developerski (jeśli skonfigurowano skrypt dev):

```bash
npm run dev
```

API będzie dostępne pod adresem:

`http://localhost:3000`

## 3. Użycie

API umożliwia zarządzanie zadaniami za pomocą żądań HTTP.

### Przykładowa struktura zadania

```json
{
  "title": "Przygotowanie dokumentacji",
  "description": "Utworzenie dokumentacji projektu",
  "status": "pending",
  "priority": "high"
}
```

### Dostępne statusy

- `pending` – zadanie oczekujące.
- `in-progress` – zadanie w trakcie realizacji.
- `completed` – zadanie ukończone.

### Dostępne priorytety

- `low` – niski.
- `medium` – średni.
- `high` – wysoki.

### Przykładowe żądanie

Utworzenie zadania za pomocą curl:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Nauka Node.js",
    "description": "Poznanie frameworka Express",
    "status": "pending",
    "priority": "high"
  }'
```

## 4. Endpointy API

Wszystkie endpointy dotyczące zadań wykorzystują prefiks:

`/api/tasks`

| Metoda | Endpoint | Opis |
|---|---|---|
| GET | `/api/tasks` | Pobieranie wszystkich zadań. |
| GET | `/api/tasks/:id` | Pobieranie zadania według ID. |
| POST | `/api/tasks` | Tworzenie nowego zadania. |
| PUT | `/api/tasks/:id` | Aktualizacja zadania. |
| DELETE | `/api/tasks/:id` | Usuwanie zadania. |

### Filtrowanie zadań

Możliwe jest filtrowanie zadań według statusu i priorytetu.

Przykład:

```http
GET /api/tasks?status=pending
```

Filtrowanie według priorytetu:

```http
GET /api/tasks?priority=high
```

Łączenie filtrów:

```http
GET /api/tasks?status=in-progress&priority=high
```

### Autoryzacja

Endpointy wymagające uwierzytelnienia powinny otrzymywać token JWT w nagłówku:

```http
Authorization: Bearer YOUR_TOKEN
```

### Przykładowe endpointy użytkowników

| Metoda | Endpoint | Opis |
|---|---|---|
| POST | `/api/auth/register` | Rejestracja użytkownika. |
| POST | `/api/auth/login` | Logowanie użytkownika. |

## 5. Podsumowanie

Simple Task API to prosty projekt backendowy umożliwiający zarządzanie zadaniami.

Dzięki wykorzystaniu Node.js, Express i MongoDB aplikacja może być rozwijana i rozbudowywana o dodatkowe funkcjonalności.

Dokumentacja przedstawia podstawowe założenia projektu, sposób instalacji oraz przykładowe wykorzystanie API.
