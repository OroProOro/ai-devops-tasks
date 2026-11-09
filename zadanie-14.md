# Zadanie 14

Wklej fragment logów:

```
May 19 10:15:32 server dockerd[1234]: time="2025-05-19T10:15:32.123456789Z" level=info msg="Container 78a2b3c4 health status changed from starting to healthy"
May 19 10:16:45 server dockerd[1234]: time="2025-05-19T10:16:45.987654321Z" level=info msg="Container 78a2b3c4 failed to connect to 172.17.0.3:5432: connection refused"
May 19 10:16:47 server dockerd[1234]: time="2025-05-19T10:16:47.246813579Z" level=warning msg="Container 78a2b3c4 health status changed from healthy to unhealthy"
```

Zapytaj:

Co się dzieje w tych logach? Jakie problemy można zidentyfikować?

## Analiza

Kontener `78a2b3c4` startuje poprawnie, a potem w ciągu około minuty traci zdrowie, bo nie może połączyć się z bazą PostgreSQL.

1. **10:15:32 — kontener staje się healthy.** Docker zmienia status healthchecka z `starting` na `healthy`. W tym momencie kontener działa i spełnia warunki sprawdzania stanu.

2. **10:16:45 — błąd połączenia z bazą.** Ten sam kontener nie łączy się z `172.17.0.3:5432`. Port `5432` to domyślny port PostgreSQL, a adres `172.17.0.3` należy do sieci mostka Dockera (`docker0`, zwykle `172.17.0.0/16`). Komunikat `connection refused` oznacza, że pakiet doszedł do hosta, ale na tym porcie nic nie nasłuchuje albo połączenie zostało odrzucone. Typowe przyczyny:
   - kontener PostgreSQL nie działa albo jeszcze nie nasłuchuje,
   - Postgres nasłuchuje tylko na `127.0.0.1` wewnątrz swojego kontenera, a nie na interfejsie sieci Dockera,
   - zły adres IP albo port (kontener bazy dostał inny adres po restarcie),
   - baza nasłuchuje, ale proces się wyłożył między healthcheckami.

3. **10:16:47 — kontener przechodzi w unhealthy.** Dwie sekundy po odmowie połączenia healthcheck kończy się niepowodzeniem i Docker zmienia status z `healthy` na `unhealthy` (poziom `warning`).

**Problem do zidentyfikowania:** aplikacja w kontenerze `78a2b3c4` zależy od PostgreSQL pod `172.17.0.3:5432`, a ta usługa jest niedostępna. Sam kontener wystartował, więc awaria nie leży w jego starcie, tylko w utracie połączenia z bazą. Adres IP z puli `docker0` jest niestabilny — po restarcie kontenera bazy może się zmienić — więc połączenie powinno iść po nazwie serwisu w sieci Dockera, a nie po stałym IP.
