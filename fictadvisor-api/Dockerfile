# Alpine image
FROM node:20-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat openssl

# Setup pnpm and turbo on the alpine base
FROM alpine AS base
RUN npm install turbo --global
RUN corepack enable && corepack prepare yarn@4.4.1

# Prune projects
FROM base AS pruner

WORKDIR /app
COPY . .
RUN turbo prune --scope=fictadvisor-api --docker

# Build the project
FROM base AS builder
ARG PROJECT

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN yarn install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

RUN yarn generate:full
RUN turbo build --filter=fictadvisor-api
RUN yarn workspaces focus --all --production

# Final image
FROM alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/fictadvisor-api

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD node dist/src/main
