
FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p src/uploads

EXPOSE 3000

CMD ["node", "server.js"]
