# Build React client
FROM node:22 AS client-builder

WORKDIR /app/client
COPY client .
RUN npm install
RUN npm run build

# Build Express server
FROM node:22 AS server-builder


WORKDIR /app/server
COPY server .
RUN npm install
RUN npm run build

# Final Image, copied builds from server & client
FROM node:22-slim
ARG NODE_PORT

WORKDIR /app
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/package.json ./server/
COPY --from=client-builder /app/client/dist ./server/public