
# Zadanie 26 – Znajdowanie i poprawianie błędów w Jenkinsfile

## 1. Cel zadania

Celem zadania było znalezienie błędów w przykładowym Jenkinsfile, poprawienie ich oraz wyjaśnienie wprowadzonych zmian.

## 2. Znalezione błędy

### Błąd 1 – Literówka stesp

Oryginalny kod:

```groovy
stesp {
```

Poprawiony kod:

```groovy
steps {
```

Wyjaśnienie:

W Jenkins Declarative Pipeline wymagane jest słowo steps. Literówka stesp powoduje błąd składni i uniemożliwia uruchomienie pipeline.

### Błąd 2 – Nieprawidłowe polecenie npm build

Oryginalny kod:

```bash
npm build
```

Poprawiony kod:

```bash
npm run build
```

Wyjaśnienie:

Polecenie npm run build uruchamia skrypt build zdefiniowany w package.json.

### Błąd 3 – Nieprawidłowa kolejność instrukcji when

Oryginalny kod:

```groovy
steps {
    sh 'docker build -t myapp .'
}
when {
    branch 'master'
}
```

Poprawiony kod:

```groovy
when {
    branch 'master'
}

steps {
    sh 'docker build -t myapp:latest .'
}
```

Wyjaśnienie:

W deklaratywnym Jenkins Pipeline warunek when powinien znajdować się na poziomie stage, przed sekcją steps.

### Błąd 4 – Niewłaściwe tagowanie obrazu Docker

Oryginalny kod:

```bash
docker build -t myapp .
docker push myapp:latest
```

Poprawiony kod:

```bash
docker build -t myapp:latest .
```

Wyjaśnienie:

Obraz powinien być budowany z takim samym tagiem, z jakim będzie publikowany.

### Błąd 5 – Brak uwierzytelniania Docker

Oryginalny kod:

```bash
docker push myapp:latest
```

Poprawione rozwiązanie:

```groovy
script {
    docker.withRegistry(
        'https://index.docker.io/v1/',
        'docker-hub-credentials'
    ) {
        docker.image('myapp:latest').push()
    }
}
```

Wyjaśnienie:

Publikowanie obrazu do prywatnego lub chronionego rejestru wymaga uwierzytelnienia.

Dane logowania powinny być przechowywane w Jenkins Credentials, a nie bezpośrednio w kodzie.

## 3. Dodatkowe ulepszenia

W poprawionej wersji zastosowano również:

- npm ci zamiast npm install dla powtarzalnej instalacji zależności.
- Komunikaty echo informujące o wykonywanych operacjach.
- Sekcję post obsługującą sukces i niepowodzenie.
- Tagowanie obrazu Docker za pomocą latest.

## 4. Korzyści z poprawek

1. Poprawna składnia Jenkins Declarative Pipeline.
2. Możliwość prawidłowego budowania aplikacji Node.js.
3. Uruchamianie wdrożenia tylko dla wybranej gałęzi.
4. Bezpieczniejsze uwierzytelnianie Docker.
5. Lepsza czytelność i diagnostyka pipeline.

## 5. Podsumowanie

Oryginalny Jenkinsfile zawierał błędy składniowe i problemy związane z konfiguracją procesu budowania oraz wdrażania.

Po poprawkach pipeline może wykonywać następujące operacje:

1. Instalowanie zależności.
2. Budowanie aplikacji.
3. Uruchamianie testów.
4. Budowanie obrazu Docker.
5. Publikowanie obrazu do Docker Hub.

Poprawiony Jenkinsfile jest bardziej czytelny, bezpieczny i łatwiejszy w utrzymaniu.

Przed uruchomieniem należy dostosować nazwę obrazu, poświadczenia Docker oraz nazwę gałęzi do rzeczywistego projektu.
