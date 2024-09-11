# Development stage
FROM node:20-bookworm-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/ \
    && npm config set "//npm.fontawesome.com/:_authToken" ECB95473-FBAF-463F-905C-C9ED4C00D519

RUN npm ci

COPY . .

ARG VITE_API_URL
RUN VITE_API_URL=${VITE_API_URL} npm run build

# Production stage
FROM caddy:2-alpine as production
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=development /app/dist /srv
