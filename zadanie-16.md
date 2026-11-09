
# Zadanie 16 – Konwersja skryptu Bash na PowerShell

## 1. Cel zadania

Celem zadania było przekonwertowanie skryptu Bash odpowiedzialnego za tworzenie kopii zapasowej bazy danych MySQL na równoważny skrypt PowerShell działający w systemie Windows.

## 2. Główne różnice między Bash i PowerShell

### 1. Deklarowanie zmiennych

- Bash: `DB_NAME="app_database"`
- PowerShell: `$DB_NAME = "app_database"`

W PowerShell zmienne rozpoczynają się znakiem `$`.

### 2. Pobieranie aktualnej daty

- Bash: `$(date +%Y%m%d_%H%M%S)`
- PowerShell: `Get-Date -Format "yyyyMMdd_HHmmss"`

PowerShell wykorzystuje polecenie Get-Date do pobierania i formatowania daty.

### 3. Sprawdzanie istnienia katalogu

- Bash: `[ ! -d "$BACKUP_DIR" ]`
- PowerShell: `Test-Path -Path $BACKUP_DIR -PathType Container`

W PowerShell do sprawdzania istnienia katalogów i plików wykorzystuje się Test-Path.

### 4. Tworzenie katalogów

- Bash: `mkdir -p "$BACKUP_DIR"`
- PowerShell: `New-Item -ItemType Directory -Path $BACKUP_DIR -Force`

PowerShell wykorzystuje polecenie New-Item do tworzenia katalogów.

### 5. Wyświetlanie komunikatów

- Bash: `echo "Rozpoczynam backup..."`
- PowerShell: `Write-Host "Rozpoczynam backup..."`

Oba polecenia służą do wyświetlania komunikatów użytkownikowi.

### 6. Obsługa błędów

- Bash: `if [ $? -eq 0 ]`
- PowerShell: `try`, `catch`, `$LASTEXITCODE`

PowerShell umożliwia obsługę wyjątków za pomocą bloków try/catch. Zmienna LASTEXITCODE pozwala sprawdzić kod zakończenia zewnętrznego programu.

### 7. Kompresja danych

- Bash: `gzip`
- PowerShell: `.NET GZipStream`

W Bash wykorzystano zewnętrzne narzędzie gzip, natomiast w PowerShell zastosowano bibliotekę .NET do kompresowania danych.

### 8. Usuwanie plików

- Bash: `rm`
- PowerShell: `Remove-Item`

PowerShell wykorzystuje Remove-Item do usuwania plików i katalogów.

## 3. Korzyści z używania PowerShell

1. Integracja z systemem Windows.
2. Rozbudowane możliwości obsługi błędów.
3. Dostęp do bibliotek .NET.
4. Łatwiejsze zarządzanie plikami i katalogami.
5. Możliwość automatyzacji zadań administracyjnych.

## 4. Podsumowanie

Oba skrypty realizują to samo zadanie – tworzenie kopii zapasowej bazy danych MySQL i zapisywanie jej w formacie GZIP.

Bash jest popularny w systemach Linux i Unix, natomiast PowerShell jest wygodnym narzędziem do automatyzacji zadań w systemie Windows.

Konwersja pozwala wykorzystać podobną funkcjonalność na różnych systemach operacyjnych.
