FROM node:14.16.0-alpine3.13

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

ENTRYPOINT yarn start