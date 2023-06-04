###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine3.17 As build

WORKDIR /app

COPY . ./

RUN yarn install --prod && \
    yarn add @vercel/ncc && \
    yarn ncc build src/main.ts -o dist

###################
# PRODUCTION
###################

FROM alpine:3.17 as production

# Upgrade APK
RUN apk --no-cache add -U \
    nodejs~18 \
    dumb-init

COPY --from=build /app/dist/ ./app

CMD [ "dumb-init", "node", "app/index.js" ]