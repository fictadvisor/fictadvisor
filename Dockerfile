FROM node:18-alpine3.16

WORKDIR /app

COPY . /app

RUN yarn install

RUN npx prisma migrate deploy

RUN yarn build

ENTRYPOINT yarn start:prod