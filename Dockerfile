# Build React client
FROM node:current-alpine AS client-builder

WORKDIR /app/client
COPY client .
RUN npm install
RUN npm run build

# Build Express server
FROM node:current-alpine

WORKDIR /app
COPY server/ ./
RUN npm install
RUN npm run build
COPY --from=client-builder /app/client/dist ./public

EXPOSE 3000

CMD ["node", "dist/index.js"]