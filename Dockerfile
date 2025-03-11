# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Serve Stage
FROM caddy:2.7-alpine

WORKDIR /srv

# Copy the built app from the Node.js stage
COPY --from=builder /app/dist /srv

# Copy the Caddy configuration
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 5173

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
