FROM node:24-alpine AS alpine
RUN apk update && apk add --no-cache libc6-compat openssl

FROM alpine AS base
RUN npm install turbo@2.10.0 --global
RUN corepack enable

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

RUN yarn workspace fictadvisor-api generate
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

# A start-first rollout is gated on this: the new task has to answer before the old one
# is killed, which is the whole of the zero-downtime deploy. Under plain compose it is
# only informational, so shipping it now costs nothing and is what Swarm will need.
#
# 127.0.0.1 rather than localhost, deliberately: `localhost` resolves to ::1 in this
# image while the server listens on IPv4, so a localhost probe fails against a perfectly
# healthy process -- which is exactly how it first looked when a probe was tried by hand.
#
# /v2/health pings the database, so a task that cannot reach Postgres never goes live.
# Three retries at ten seconds means a blip has to last half a minute to count, and the
# start period covers the Nest boot.
HEALTHCHECK --interval=10s --timeout=3s --start-period=40s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT:-3000}/v2/health" > /dev/null || exit 1

CMD ["node", "dist/src/main"]
