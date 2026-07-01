###################
# BASE
###################

FROM node:24-alpine AS alpine
RUN apk update && apk add --no-cache libc6-compat

FROM alpine AS base
RUN npm install turbo --global
RUN corepack enable && corepack prepare yarn@4.17.0

###################
# PRUNE WORKSPACE
###################

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune @fictadvisor/frontend --docker

###################
# BUILD FOR PRODUCTION
###################

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=pruner /app/out/json/ .

# Persist Yarn's global cache across builds so unchanged deps are not re-fetched.
RUN --mount=type=cache,target=/root/.yarn/berry/cache,sharing=locked \
    YARN_ENABLE_GLOBAL_CACHE=1 yarn install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "development" ]; then \
    cp /app/fictadvisor-web/.env.development /app/fictadvisor-web/.env.production; fi

ENV NODE_ENV="production"
# Persist Next.js' incremental compiler cache (.next/cache) across builds.
# It is not part of the standalone output, so it is never copied into the final image.
RUN --mount=type=cache,target=/app/fictadvisor-web/.next/cache \
    turbo build --filter @fictadvisor/frontend

###################
# PRODUCTION
###################

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/fictadvisor-web/.next/standalone ./
COPY --from=builder /app/fictadvisor-web/public fictadvisor-web/public/
COPY --from=builder /app/fictadvisor-web/.next/static fictadvisor-web/.next/static/
COPY --from=builder /app/utils utils/

ENV PORT=80
EXPOSE 80

CMD [ "node", "./fictadvisor-web/server.js" ]
