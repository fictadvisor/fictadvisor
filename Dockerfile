FROM node:14.16.0

WORKDIR /app

COPY . /app

RUN npm i

RUN npm run build

ENTRYPOINT npm run start