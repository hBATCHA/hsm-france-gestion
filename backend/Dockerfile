FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && ([ -f /app/.pgdata/.seeded ] || (npx ts-node prisma/seed.ts && touch /app/.pgdata/.seeded)) && npx ts-node-dev src/server.ts"]
