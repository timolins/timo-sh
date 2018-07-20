FROM mhart/alpine-node:10
WORKDIR /usr/src
COPY yarn.lock package.json ./
RUN apk add --update \
    bash \
    lcms2-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    autoconf \
    automake \
    build-base \
    nasm
RUN yarn
COPY . .
RUN yarn build \
 && mv ./public/content ./dist/content \
 && mv ./dist /public
