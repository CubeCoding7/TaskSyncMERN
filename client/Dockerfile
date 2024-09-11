FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/ \
    && npm config set "//npm.fontawesome.com/:_authToken" ECB95473-FBAF-463F-905C-C9ED4C00D519

RUN npm ci

COPY . .
