FROM node:current-alpine

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
COPY . .

RUN npm ci
WORKDIR /app/client
RUN npm ci && npm run build

WORKDIR /app/server
RUN npm ci && npm run build

RUN cp -r /app/client/dist /app/server/dist/public

WORKDIR /app
RUN npm prune --production && npm cache clean --force

EXPOSE 3000

WORKDIR /app/server
CMD ["node", "dist/index.js"]