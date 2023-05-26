FROM node:18-alpine3.16

WORKDIR /app
COPY . /app

RUN yarn install
RUN npx prisma generate
RUN yarn build

ENTRYPOINT yarn start:prod
