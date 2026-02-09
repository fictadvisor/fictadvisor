FROM node:20-slim AS base

RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Setup pnpm and turbo on the alpine base
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

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN yarn install --frozen-lockfile
RUN npm rebuild --build-from-source

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

RUN yarn generate:full
RUN turbo build --filter=fictadvisor-api
RUN yarn workspaces focus --all --production

# Final image
FROM base AS runner

RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nodejs

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
