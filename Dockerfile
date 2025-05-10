# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Serving Stage
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Removing default NGINX static files
RUN rm -rf ./*

# Copying the built app from the Node.js stage
COPY --from=builder /app/dist ./

# Copying a custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
