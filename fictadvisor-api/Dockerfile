FROM node:20-alpine AS alpine
RUN apk update && apk add --no-cache libc6-compat openssl

FROM alpine AS base
RUN npm install turbo --global
RUN corepack enable && corepack prepare yarn@4.4.1

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=fictadvisor-api --docker

FROM base AS builder
ARG PROJECT
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=pruner /app/out/json/ .

RUN yarn install --frozen-lockfile
RUN npm rebuild --build-from-source

COPY --from=pruner /app/out/full/ .

RUN yarn generate:full
RUN turbo build --filter=fictadvisor-api
RUN yarn workspaces focus --all --production

FROM alpine AS runner

RUN addgroup -g 1001 nodejs && \
    adduser -u 1001 -G nodejs -s /bin/sh -D nodejs
USER nodejs

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/fictadvisor-api

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=6144"
EXPOSE ${PORT}

CMD ["node", "dist/src/main"]
