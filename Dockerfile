FROM node:20-alpine


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm ci


COPY . .


RUN rm -rf dist && npm run build


EXPOSE 5173


CMD ["npm", "run", "preview"]
