FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]
