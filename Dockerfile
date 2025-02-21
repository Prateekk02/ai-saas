FROM node:18-alpine AS builder


WORKDIR /app


COPY package*.json ./
COPY ./prisma .

RUN npm install --frozen-lockfile
RUN npx prisma generate

COPY . .


RUN npm run build
RUN npm prune --production


FROM node:18-alpine AS runner


WORKDIR /app


COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public


EXPOSE 3000


CMD ["npm", "run", "start"]
