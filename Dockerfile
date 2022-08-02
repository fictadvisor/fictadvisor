FROM node:14.16.0-alpine3.13

WORKDIR /app

COPY . /app

RUN mkdir -p "/app/static/articles"

ENV ARTICLES_PATH=/app/static/articles

RUN yarn install

RUN yarn build

ENTRYPOINT yarn start
