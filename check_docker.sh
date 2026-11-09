# Zadanie 7: Sprawdzenie i uruchomienie usługi Docker

```bash
#!/usr/bin/env bash
set -euo pipefail

if systemctl is-active --quiet docker; then
  echo "Usługa Docker działa."
  exit 0
fi

echo "Usługa Docker nie działa. Próba uruchomienia..."

if sudo systemctl start docker; then
  echo "Usługa Docker została uruchomiona."
else
  echo "Nie udało się uruchomić usługi Docker." >&2
  exit 1
fi
```