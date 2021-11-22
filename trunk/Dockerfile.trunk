FROM arm32v7/node:14 AS builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM arm32v7/node:14 AS starter
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD [ "node", "./dist/pine-trunk.js" ]