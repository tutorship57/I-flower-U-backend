FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma ต้องมี DATABASE_URL ตอน build (dummy ได้)
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate
RUN npm run build

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
