FROM arm32v7/node:14-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm install
COPY . ./
RUN npm run build

FROM arm32v7/node:14-alpine AS starter
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD [ "node", "./dist/bundle.js" ]