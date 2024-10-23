FROM node:alpine as build

WORKDIR /app

ENV VITE_BASE "/"

COPY package*.json .

RUN npm ci 

COPY . .

RUN npm run build

FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html