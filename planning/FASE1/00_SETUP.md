# FASE 1 — Setup del Monorepo
## Impacta+ SaaS

> Principios: SOLID · ISO/IEC 25010 · ITIL Service Design
> **NO improvisar rutas, nombres de paquetes ni versiones. Usar exactamente lo especificado.**

---

## 1. Prerrequisitos

```bash
node  --version   # 20.x LTS
pnpm  --version   # 9.x
docker --version  # 24.x
```

---

## 2. Estructura exacta del monorepo

```
impacta-saas/                         ← raíz del proyecto
├── apps/
│   ├── api/                          ← NestJS 10 (puerto 3000)
│   ├── web/                          ← React 18 + Vite 5 (puerto 5173)
│   ├── landing/                      ← Next.js 14 (puerto 3001)
│   └── admin/                        ← React 18 + Vite 5 (puerto 5174)
├── packages/
│   ├── ui/                           ← shadcn/ui components compartidos
│   ├── database/                     ← Prisma schema + migraciones
│   ├── auth/                         ← JWT helpers, guards compartidos
│   ├── payments/                     ← lógica de pasarelas de pago
│   ├── accounting/                   ← módulo contable chileno
│   ├── types/                        ← tipos TypeScript compartidos
│   ├── utils/                        ← helpers compartidos
│   └── eslint-config/                ← config ESLint compartida
├── docker/
│   ├── nginx/
│   │   └── nginx.conf
│   ├── postgres/
│   │   └── init.sql                  ← RLS policies + seed inicial
│   └── redis/
│       └── redis.conf
├── infra/
│   ├── docker-compose.yml            ← desarrollo local
│   ├── docker-compose.prod.yml       ← producción
│   └── scripts/
│       ├── setup.sh
│       └── seed.ts
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .env.example
├── .gitignore
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 3. Inicialización del proyecto

```bash
# 1. Crear monorepo con Turborepo
pnpm dlx create-turbo@latest impacta-saas --package-manager pnpm

# 2. Crear apps
cd impacta-saas
pnpm dlx create-nest apps/api
pnpm create vite apps/web --template react-ts
pnpm create vite apps/admin --template react-ts
pnpm create next-app apps/landing --typescript --tailwind --eslint --app --no-src-dir

# 3. Crear packages vacíos (con package.json mínimo)
mkdir -p packages/{ui,database,auth,payments,accounting,types,utils,eslint-config}
```

---

## 4. `pnpm-workspace.yaml` (exacto)

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

## 5. `turbo.json` (exacto)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "outputs": ["coverage/**"]
    },
    "db:generate": {
      "cache": false
    },
    "db:migrate": {
      "cache": false
    }
  }
}
```

---

## 6. `package.json` raíz (exacto)

```json
{
  "name": "impacta-saas",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "db:generate": "turbo run db:generate --filter=@impacta/database",
    "db:migrate": "turbo run db:migrate --filter=@impacta/database",
    "db:seed": "turbo run db:seed --filter=@impacta/database",
    "db:studio": "cd packages/database && pnpm prisma studio"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "prettier": "^3.2.0",
    "typescript": "^5.4.0"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

---

## 7. Variables de entorno `.env.example`

```env
# ─── Base de Datos ────────────────────────────────────────────────
DATABASE_URL="postgresql://impacta:impacta_dev_pass@localhost:5432/impacta_dev"
DATABASE_URL_TEST="postgresql://impacta:impacta_dev_pass@localhost:5432/impacta_test"

# ─── Redis ────────────────────────────────────────────────────────
REDIS_URL="redis://localhost:6379"

# ─── JWT ──────────────────────────────────────────────────────────
JWT_SECRET="CAMBIAR_EN_PRODUCCION_min_32_chars_aqui"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# ─── App ──────────────────────────────────────────────────────────
NODE_ENV="development"
APP_URL="http://localhost:3000"
WEB_URL="http://localhost:5173"
LANDING_URL="http://localhost:3001"
ADMIN_URL="http://localhost:5174"
PORT=3000

# ─── Pagos ────────────────────────────────────────────────────────
MERCADOPAGO_ACCESS_TOKEN=""
MERCADOPAGO_PUBLIC_KEY=""
PAYPAL_CLIENT_ID=""
PAYPAL_CLIENT_SECRET=""
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# ─── Email ────────────────────────────────────────────────────────
EMAIL_PROVIDER="sendgrid"        # sendgrid | resend
SENDGRID_API_KEY=""
RESEND_API_KEY=""
EMAIL_FROM="noreply@impacta.cl"
EMAIL_FROM_NAME="Impacta+"

# ─── Storage ──────────────────────────────────────────────────────
STORAGE_PROVIDER="local"         # local | s3 | minio
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_ACCESS_KEY=""
MINIO_SECRET_KEY=""
MINIO_BUCKET="impacta"
S3_BUCKET=""
AWS_REGION=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""

# ─── Super Admin (seed) ───────────────────────────────────────────
SUPER_ADMIN_EMAIL="admin@impacta.cl"
SUPER_ADMIN_PASSWORD="CAMBIAR_EN_PRODUCCION"
```

---

## 8. `docker-compose.yml` (desarrollo)

```yaml
version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    container_name: impacta_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: impacta
      POSTGRES_PASSWORD: impacta_dev_pass
      POSTGRES_DB: impacta_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U impacta"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: impacta_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
      - ./docker/redis/redis.conf:/usr/local/etc/redis/redis.conf
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: impacta_pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@impacta.cl
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres

  minio:
    image: minio/minio:latest
    container_name: impacta_minio
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: impacta
      MINIO_ROOT_PASSWORD: impacta_dev_pass
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

---

## 9. `packages/database/package.json`

```json
{
  "name": "@impacta/database",
  "version": "0.0.1",
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:seed": "ts-node --compiler-options '{\"module\":\"CommonJS\"}' prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset --force"
  },
  "dependencies": {
    "@prisma/client": "^5.12.0"
  },
  "devDependencies": {
    "prisma": "^5.12.0",
    "ts-node": "^10.9.0",
    "typescript": "^5.4.0"
  },
  "exports": {
    ".": "./src/index.ts"
  }
}
```

---

## 10. Dependencias por app

### `apps/api` — NestJS
```bash
pnpm add @nestjs/core @nestjs/common @nestjs/platform-express @nestjs/jwt @nestjs/passport @nestjs/config @nestjs/bull @nestjs/swagger @nestjs/throttler @nestjs/schedule
pnpm add passport passport-jwt passport-local
pnpm add @prisma/client redis ioredis bullmq
pnpm add argon2 class-validator class-transformer
pnpm add @sendgrid/mail resend
pnpm add mercadopago stripe @paypal/checkout-server-sdk
pnpm add winston nest-winston
pnpm add helmet compression
```

### `apps/web` y `apps/admin` — React + Vite
```bash
pnpm add @tanstack/react-query @tanstack/react-table
pnpm add zustand
pnpm add react-hook-form @hookform/resolvers zod
pnpm add lucide-react
pnpm add recharts
pnpm add @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
pnpm add react-router-dom
pnpm add axios
pnpm add sonner
pnpm add date-fns
pnpm add leaflet react-leaflet
pnpm add i18next react-i18next i18next-browser-languagedetector
```

### shadcn/ui (ejecutar en apps/web y apps/admin)
```bash
pnpm dlx shadcn@latest init
# Seleccionar: TypeScript, Default style, CSS variables, zinc base color
pnpm dlx shadcn@latest add button card input label select textarea badge
pnpm dlx shadcn@latest add dialog sheet drawer popover tooltip
pnpm dlx shadcn@latest add table pagination
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add dropdown-menu navigation-menu
pnpm dlx shadcn@latest add avatar skeleton separator
pnpm dlx shadcn@latest add alert alert-dialog
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add calendar date-picker
pnpm dlx shadcn@latest add command
pnpm dlx shadcn@latest add progress
pnpm dlx shadcn@latest add chart
```

---

## 11. Inicio rápido post-setup

```bash
# Clonar y configurar
git clone <repo> impacta-saas
cd impacta-saas
cp .env.example .env
# Editar .env con valores reales

# Instalar dependencias
pnpm install

# Levantar infraestructura
docker compose up -d

# Base de datos
pnpm db:migrate
pnpm db:seed

# Desarrollo (todos los apps en paralelo)
pnpm dev
```

---

## 12. Convenciones de código (SOLID aplicado)

| Principio | Aplicación concreta |
|-----------|---------------------|
| **SRP** | Un archivo = una responsabilidad. Controllers solo reciben/retornan. Services solo lógica de negocio. Repositories solo acceso a datos. |
| **OCP** | Usar estrategia/factory para pasarelas de pago. Nuevo proveedor = nueva clase, no editar existentes. |
| **LSP** | Todas las implementaciones de `IPaymentProvider` intercambiables sin romper el sistema. |
| **ISP** | Interfaces pequeñas: `ICanSendEmail`, `ICanProcessPayment`, `ICanGeneratePDF`. No una interfaz gigante. |
| **DIP** | NestJS DI container. Nunca `new Service()` directamente. Todo inyectado. |

## 13. Calidad ISO/IEC 25010 — métricas objetivo Fase 1

| Característica | Métrica | Objetivo |
|----------------|---------|----------|
| Rendimiento | Tiempo de respuesta API (p95) | < 500ms |
| Rendimiento | Carga inicial web (LCP) | < 2.5s |
| Confiabilidad | Uptime | 99.9% |
| Seguridad | OWASP Top 10 | 0 vulnerabilidades críticas |
| Usabilidad | WCAG | 2.1 nivel AA |
| Mantenibilidad | Cobertura de tests | > 70% |
| Mantenibilidad | Complejidad ciclomática | < 10 por función |
