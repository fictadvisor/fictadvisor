###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine3.17 as build

WORKDIR /app

COPY . ./

RUN yarn install --prod && yarn build

###################
# PRODUCTION
###################

FROM alpine:3.17 as production

# Upgrade APK
RUN apk --no-cache add -U nodejs~18

WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

ENV PORT 80

CMD [ "node", "server.js" ]