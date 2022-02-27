FROM node:17.6.0-alpine as builder

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn build && yarn --production

FROM node:17.6.0-alpine

WORKDIR /opt/app

COPY --from=builder /opt/app/dist/ ./dist
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/package.json ./

CMD ["node", "dist/main"]
