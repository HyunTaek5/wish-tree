# 빌드 스테이지
FROM node:18-alpine AS builder

WORKDIR /app

# Dependency 설치
COPY package*.json ./

# pnpm 설치
RUN npm install -g pnpm

RUN pnpm install

# 소스코드 복사
COPY . .

# 빌드
RUN npm run build

# 베포용 빌드 이미지 스테이지
FROM node:18-alpine

ARG API_PORT
ARG DATABASE_URL
ARG SHADOW_DATABASE_URL

ARG KYSELY_DB_HOST
ARG KYSELY_DB_PORT
ARG KYSELY_DB_USER
ARG KYSELY_DB_PASSWORD

# 프로덕션 환경변수
ENV NODE_ENV=production
ENV APP_ENV=production

ENV API_PORT=$API_PORT
ENV DATABASE_URL=$DATABASE_URL
ENV SHADOW_DATABASE_URL=$SHADOW_DATABASE_URL

ENV KYSELY_DB_HOST=$KYSELY_DB_HOST
ENV KYSELY_DB_PORT=$KYSELY_DB_PORT
ENV KYSELY_DB_USER=$KYSELY_DB_USER
ENV KYSELY_DB_PASSWORD=$KYSELY_DB_PASSWORD
ENV KYSELY_DB_NAME=wish-tree-db

WORKDIR /app

COPY package*.json ./

# 빌드된 파일들만 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# 포트
EXPOSE 8000

# 실행
CMD ["node", "dist/main.js"]