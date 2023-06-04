###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine3.17 as build

WORKDIR /app

COPY . ./

RUN yarn install --prod && \
    yarn add @vercel/ncc && \
    yarn ncc build src/main.ts -o dist && \
    mv dist/client/* dist

###################
# PRODUCTION
###################

FROM alpine:3.18 as production

WORKDIR /app

# Upgrade APK
RUN apk --no-cache add -U \
    nodejs~18 \
    dumb-init

COPY --from=build /app/dist/ ./

CMD [ "dumb-init", "node", "index.js" ]