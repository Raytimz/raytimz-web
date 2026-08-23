FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/dist/standalone ./
COPY --from=builder --chown=node:node /app/node_modules/react ./node_modules/react
COPY --from=builder --chown=node:node /app/node_modules/react-dom ./node_modules/react-dom
COPY --from=builder --chown=node:node /app/node_modules/react-server-dom-webpack ./node_modules/react-server-dom-webpack
COPY --from=builder --chown=node:node /app/node_modules/scheduler ./node_modules/scheduler
COPY --from=builder --chown=node:node /app/node_modules/acorn-loose ./node_modules/acorn-loose
COPY --from=builder --chown=node:node /app/node_modules/neo-async ./node_modules/neo-async
COPY --from=builder --chown=node:node /app/node_modules/webpack-sources ./node_modules/webpack-sources

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
