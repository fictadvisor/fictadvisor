FROM node:18-alpine3.16

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

ENTRYPOINT npx next dev -p 80
