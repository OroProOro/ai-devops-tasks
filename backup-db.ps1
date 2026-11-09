
# backup-db.ps1
# Prosty skrypt do backupu bazy danych w Windows

$DB_NAME = "app_database"
$BACKUP_DIR = "C:\Backups\db"

$DATE = Get-Date -Format "yyyyMMdd_HHmmss"
$FILENAME = Join-Path $BACKUP_DIR "${DB_NAME}_${DATE}.sql.gz"
$SQL_FILE = Join-Path $BACKUP_DIR "${DB_NAME}_${DATE}.sql"

# Sprawdź czy katalog istnieje
if (!(Test-Path -Path $BACKUP_DIR -PathType Container)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR -Force | Out-Null
    Write-Host "Utworzono katalog $BACKUP_DIR"
}

try {
    # Sprawdź czy mysqldump jest dostępny
    if (!(Get-Command mysqldump -ErrorAction SilentlyContinue)) {
        throw "Nie znaleziono mysqldump. Sprawdź instalację MySQL i zmienną PATH."
    }

    # Wykonaj backup
    Write-Host "Rozpoczynam backup bazy $DB_NAME..."

    # Eksport bazy do pliku SQL
    & mysqldump --user=root --password "--result-file=$SQL_FILE" $DB_NAME

    if ($LASTEXITCODE -ne 0) {
        throw "Błąd podczas wykonywania mysqldump!"
    }

    # Kompresja pliku SQL do formatu GZIP
    $InputStream = [System.IO.File]::OpenRead($SQL_FILE)
    $OutputStream = [System.IO.File]::Create($FILENAME)

    try {
        $GzipStream = New-Object System.IO.Compression.GZipStream(
            $OutputStream,
            [System.IO.Compression.CompressionMode]::Compress
        )

        try {
            $InputStream.CopyTo($GzipStream)
        }
        finally {
            $GzipStream.Dispose()
        }
    }
    finally {
        $InputStream.Dispose()
        $OutputStream.Dispose()
    }

    Write-Host "Backup zakończony sukcesem: $FILENAME" -ForegroundColor Green
}
catch {
    Write-Host "Błąd podczas wykonywania backupu: $_" -ForegroundColor Red

    # Usuń niekompletny plik backupu
    if (Test-Path $FILENAME) {
        Remove-Item $FILENAME -Force
    }

    exit 1
}
finally {
    # Usuń tymczasowy plik SQL
    if (Test-Path $SQL_FILE) {
        Remove-Item $SQL_FILE -Force
    }
}
