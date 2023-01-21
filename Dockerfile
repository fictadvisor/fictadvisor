FROM node:18-alpine3.16

WORKDIR /app

COPY . /app

RUN yarn install

RUN prisma migrate dev

RUN prisma generate

RUN yarn build

ENTRYPOINT yarn start:prod