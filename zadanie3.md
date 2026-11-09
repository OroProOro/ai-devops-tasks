```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

Obraz `node:20-alpine` jest lekki. Najpierw kopiowane są pliki zależności i uruchamiane jest `npm ci`, żeby warstwa z paczkami nie przebudowywała się przy każdej zmianie kodu. Kontener nasłuchuje na porcie 3000 i startuje aplikację poleceniem `node index.js`.



FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]