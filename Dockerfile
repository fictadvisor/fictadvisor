FROM node:18-alpine3.16

WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn build

CMD ["yarn","start:prod"]
