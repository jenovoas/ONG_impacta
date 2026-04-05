# ── Etapa 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache python3 make g++ openssl openssl-dev

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/database/package.json ./packages/database/
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile

COPY packages/database ./packages/database
COPY apps/api ./apps/api

RUN pnpm --filter @impacta/database exec prisma generate
RUN pnpm --filter api run build

# ── Etapa 2: Runtime ─────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl python3 make g++ && \
    corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/database/package.json ./packages/database/
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --prod

# Copiar el build y el schema de Prisma (el cliente ya fue reinstalado arriba)
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/database ./packages/database

# Regenerar cliente Prisma en runtime para asegurar compatibilidad
RUN pnpm --filter @impacta/database exec prisma generate

# Limpiar herramientas de compilación
RUN apk del python3 make g++

EXPOSE 4000
CMD ["node", "apps/api/dist/main"]
