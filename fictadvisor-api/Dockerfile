###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine3.17 as pruner

WORKDIR /app

COPY . .

RUN npm i -g turbo@^2.0.5 && \
    turbo prune fictadvisor-api --docker


FROM node:18-alpine3.17 as builder

WORKDIR /app

COPY --from=pruner ./app/out/full/ ./
COPY --from=pruner ./app/out/yarn.lock ./

RUN npm install && \
    npx prisma generate --schema ./fictadvisor-api/prisma/schema.prisma && \
    npx turbo build --filter fictadvisor-api && \
    npm prune --prod && \
    rm -rf ./fictadvisor-api/src && \
    rm -rf ./fictadvisor-api/prisma && \
    rm -rf ./utils/src && \
    mv ./fictadvisor-api/dist/* ./fictadvisor-api && \
    rm -rf dist && \
    mv -T fictadvisor-api/src fictadvisor-api/dist && \
    mv ./fictadvisor-api/email . && \
    mkdir ./static && \
    mkdir ./private


###################
# PRODUCTION
###################

FROM alpine:3.18 as production

WORKDIR /app

# Upgrade APK
RUN apk --no-cache add -U \
    nodejs~18 \
    dumb-init

COPY --from=builder /app ./

CMD [ "dumb-init", "node", "./fictadvisor-api/dist/main.js" ]

