###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine3.17 as pruner

WORKDIR /app

COPY . .

RUN npm i -g turbo@^2.0.5 && \
    turbo prune @fictadvisor/frontend --docker


FROM node:18-alpine3.17 as builder

WORKDIR /app

COPY --from=pruner ./app/out/full/ ./
COPY --from=pruner ./app/out/yarn.lock ./

ARG NODE_ENV=${NODE_ENV}
RUN if [ $NODE_ENV = "development" ]; then \
    cp /app/fictadvisor-web/.env.development /app/fictadvisor-web/.env.production; fi

ENV NODE_ENV="production"
RUN yarn install --production=false && \
    npx turbo build --filter @fictadvisor/frontend

###################
# PRODUCTION
###################

FROM alpine:3.17 as production

# Upgrade APK
RUN apk --no-cache add -U nodejs~18

WORKDIR /app

COPY --from=builder /app/fictadvisor-web/.next/standalone ./
COPY --from=builder /app/fictadvisor-web/public fictadvisor-web/public/
COPY --from=builder /app/fictadvisor-web/.next/static fictadvisor-web/.next/static/
COPY --from=builder /app/utils utils/

ENV PORT 80

CMD [ "node", "./fictadvisor-web/server.js" ]
