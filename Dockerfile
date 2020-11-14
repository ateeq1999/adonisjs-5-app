FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json npm.* ./

RUN apk add --no-cache git

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN npm

USER node

EXPOSE 3333

ENTRYPOINT ["node","ace","serve","--watch"]