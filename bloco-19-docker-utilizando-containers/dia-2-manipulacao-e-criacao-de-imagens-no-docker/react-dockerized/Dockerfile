FROM node:14-alpine AS build
WORKDIR /app # Definimos o workdir
COPY ["./app", "/usr/src/app"]
RUN npm install
COPY . .
RUN npm run build
