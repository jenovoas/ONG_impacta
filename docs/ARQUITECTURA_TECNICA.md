# Documento de Arquitectura Técnica
## ONG Impacta+ — Plataforma SaaS de Gestión

| **Versión** | 1.0 |
|-------------|-----|
| **Fecha** | 4 de abril de 2026 |
| **Estado** | En desarrollo |
| **Dominio** | impacta.pinguinoseguro.cl |

---

## 1. Visión General de Arquitectura

### 1.1 Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE PRESENTACIÓN                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │   Landing Page  │  │  Dashboard Web  │  │   Portal Socio  │         │
│  │   (Next.js)     │  │   (React + Vite)│  │   (React)       │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE API GATEWAY                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Nginx (Reverse Proxy + SSL)                   │   │
│  │              Rate Limiting • Cache • Compresión                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         CAPA DE APLICACIÓN (Backend)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   Auth       │  │   Core       │  │   Pagos      │  │  Contable  │  │
│  │   Service    │  │   Service    │  │   Service    │  │  Service   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────  │
│  │   Eventos    │  │  Voluntarios │  │   Ecología   │  │  Reportes  │  │
│  │   Service    │  │   Service    │  │   Service    │  │  Service   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘  │
│                    (NestJS + TypeScript + REST/GraphQL)                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE DATOS                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │   PostgreSQL     │  │     Redis        │  │  MinIO / S3      │      │
│  │   (Principal)    │  │   (Cache/Colas)  │  │  (Archivos)      │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         SERVICIOS EXTERNOS                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────┐    │
│  │MercadoPago │  │   PayPal   │  │   Stripe   │  │  SendGrid/     │    │
│  │            │  │            │  │            │  │  Resend        │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológico

### 2.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.x | Librería UI principal |
| **Next.js** | 14.x | Landing Page, SSR, SEO |
| **Vite** | 5.x | Build tool para dashboard |
| **TypeScript** | 5.x | Tipado estático |
| **TailwindCSS** | 3.x | Estilos utilitarios |
| **shadcn/ui** | latest | Componentes UI |
| **TanStack Query** | 5.x | Data fetching, cache |
| **Zustand** | 4.x | Estado global |
| **React Hook Form** | 7.x | Formularios |
| **Zod** | 3.x | Validación de esquemas |
| **Lucide Icons** | latest | Iconografía |
| **Recharts** | 2.x | Gráficos y dashboards |
| **FullCalendar** | 6.x | Calendario |
| **React Table** | 8.x | Tablas avanzadas |

### 2.2 Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 20.x LTS | Runtime |
| **NestJS** | 10.x | Framework backend |
| **TypeScript** | 5.x | Tipado estático |
| **Prisma ORM** | 5.x | ORM type-safe |
| **PostgreSQL** | 16.x | Base de datos principal |
| **Redis** | 7.x | Cache, colas, sesiones |
| **BullMQ** | 5.x | Colas de trabajos |
| **JWT** | 9.x | Autenticación |
| **class-validator** | 0.x | Validación de DTOs |
| **Swagger/OpenAPI** | latest | Documentación API |
| **Winston** | 3.x | Logging estructurado |
| **Helm** | latest | Tests E2E |

### 2.3 Infraestructura

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Docker** | 24.x | Contenedores |
| **Docker Compose** | 2.x | Orquestación local |
| **Nginx** | 1.25.x | Reverse proxy, SSL |
| **GitHub Actions** | latest | CI/CD |
| **Prometheus** | 2.x | Métricas |
| **Grafana** | 10.x | Dashboards de monitoreo |
| **Loki** | 2.x | Agregación de logs |
| **pgAdmin** | latest | Admin PostgreSQL |
| **Redis Commander** | latest | Admin Redis |

---

## 3. Estructura del Proyecto

### 3.1 Monorepo (Turborepo)

```
impacta-saas/
├── apps/
│   ├── web/                    # Dashboard principal (React + Vite)
│   ├── landing/                # Landing pages (Next.js)
│   ├── api/                    # Backend API (NestJS)
│   └── admin/                  # Panel super-admin (React)
├── packages/
│   ├── ui/                     # Componentes UI compartidos
│   ├── database/               # Schema Prisma, migraciones
│   ├── auth/                   # Lógica de autenticación
│   ├── payments/               # Módulo de pagos
│   ├── accounting/             # Módulo contable chileno
│   ├── types/                  # Tipos TypeScript compartidos
│   ├── utils/                  # Utilidades compartidas
│   └── eslint-config/          # Configuración ESLint
├── docker/
│   ├── nginx/
│   ├── postgres/
│   └── redis/
├── infra/
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   └── scripts/
├── .github/
│   └── workflows/
├── docs/
├── .env.example
├── .gitignore
├── turbo.json
├── package.json
└── README.md
```

### 3.2 Backend (NestJS) - Estructura Modular

```
apps/api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   └── jwt.config.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── strategies/
│   │   │   └── dto/
│   │   ├── users/
│   │   ├── organizations/
│   │   ├── members/
│   │   ├── volunteers/
│   │   ├── roles/
│   │   ├── calendar/
│   │   ├── tasks/
│   │   ├── payments/
│   │   ├── donations/
│   │   ├── events/
│   │   ├── raffles/
│   │   ├── accounting/
│   │   ├── social-aid/
│   │   ├── ecology/
│   │   ├── species/
│   │   ├── crm/
│   │   └── reports/
│   └── database/
│       ├── prisma.service.ts
│       └── migrations/
```

---

## 4. Modelo de Datos (Entidades Principales)

### 4.1 Multi-tenancy

```prisma
// Schema Prisma simplificado

model Organization {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  logo        String?
  colors      Json?
  config      Json?
  plan        PlanType @default(FREE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users       User[]
  members     Member[]
  events      Event[]
  donations   Donation[]
  // ... todas las entidades tienen organización
  
  @@index([slug])
}

enum PlanType {
  FREE
  BASIC
  PRO
  ENTERPRISE
}
```

### 4.2 Usuarios y Autenticación

```prisma
model User {
  id            String    @id @default(uuid())
  organizationId String
  email         String
  passwordHash  String
  role          RoleType
  positions     Position[]  // Cargos directivos
  isActive      Boolean   @default(true)
  lastLogin     DateTime?
  createdAt     DateTime  @default(now())
  
  organization  Organization @relation(fields: [organizationId], references: [id])
  
  @@unique([organizationId, email])
}

enum RoleType {
  SUPER_ADMIN
  ORGANIZATION_ADMIN
  COORDINATOR
  MEMBER
  VOLUNTEER
  DONOR
}

model Position {
  id            String   @id @default(uuid())
  userId        String
  name          String   // Presidente, Tesorero, etc.
  description   String?
  permissions   Json
  startDate     DateTime
  endDate       DateTime?
  
  user          User     @relation(fields: [userId], references: [id])
}
```

### 4.3 Módulo Contable Chileno

```prisma
model AccountingPlan {
  id             String   @id @default(uuid())
  organizationId String
  code           String   // Código de cuenta (ej: 1.1.01.001)
  name           String   // Nombre de la cuenta
  type           AccountType
  parentId       String?
  level          Int
  normalBalance  DebitCredit
  isActive       Boolean  @default(true)
  
  organization   Organization @relation(fields: [organizationId], references: [id])
  parent         AccountingPlan? @relation("AccountHierarchy", fields: [parentId], references: [id])
  children       AccountingPlan[] @relation("AccountHierarchy")
  movements      AccountingMovement[]
}

enum AccountType {
  ASSET           // Activo
  LIABILITY       // Pasivo
  EQUITY          // Patrimonio
  REVENUE         // Ingresos
  EXPENSE         // Gastos
}

enum DebitCredit {
  DEBIT
  CREDIT
}

model AccountingMovement {
  id             String   @id @default(uuid())
  organizationId String
  date           DateTime
  description    String
  reference      String?    // Número de documento
  source         String     // Origen (manual, pago, donación, etc.)
  sourceId       String?    // ID del documento origen
  isPosted       Boolean    @default(false)
  
  organization   Organization @relation(fields: [organizationId], references: [id])
  lines          AccountingLine[]
}

model AccountingLine {
  id             String   @id @default(uuid())
  movementId     String
  accountId      String
  debit          Decimal  @db.Decimal(15, 2)
  credit         Decimal  @db.Decimal(15, 2)
  
  movement       AccountingMovement @relation(fields: [movementId], references: [id])
  account        AccountingPlan @relation(fields: [accountId], references: [id])
  
  @@index([movementId])
  @@index([accountId])
}
```

### 4.4 Socios y Voluntarios

```prisma
model Member {
  id             String   @id @default(uuid())
  organizationId String
  userId         String?
  rut            String?  // RUT chileno
  firstName      String
  lastName       String
  email          String
  phone          String?
  birthDate      DateTime?
  gender         String?
  address        String?
  city           String?
  region         String?
  emergencyContact Json?
  
  membership     Membership?
  positions      Position[]
  tasks          Task[]
  events         EventAttendance[]
  
  @@unique([organizationId, rut])
}

model Membership {
  id             String   @id @default(uuid())
  memberId       String   @unique
  type           MembershipType
  status         MembershipStatus @default(ACTIVE)
  startDate      DateTime
  endDate        DateTime?
  fee            Decimal  @db.Decimal(10, 0)  // Cuota en pesos
  paymentFrequency PaymentFrequency
  
  member         Member   @relation(fields: [memberId], references: [id])
  payments       MembershipPayment[]
}

enum MembershipType {
  HONORARIO
  TITULAR
   JUVENIL
  COLABORADOR
}

enum MembershipStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  CANCELLED
}

enum PaymentFrequency {
  MONTHLY
  QUARTERLY
  ANNUAL
  LIFETIME
}
```

### 4.5 Calendario y Tareas

```prisma
model Task {
  id             String   @id @default(uuid())
  organizationId String
  title          String
  description    String?
  type           TaskType
  priority       Priority @default(MEDIUM)
  status         TaskStatus @default(PENDING)
  dueDate        DateTime?
  completedAt    DateTime?
  isRecurring    Boolean  @default(false)
  recurrenceRule String?  // RRULE formato
  
  assignedTo     String[] // IDs de usuarios
  createdBy      String
  eventId        String?
  
  assignedUsers  User[]
  creator        User     @relation("TaskCreator", fields: [createdBy], references: [id])
  event          Event?   @relation(fields: [eventId], references: [id])
}

enum TaskType {
  GENERAL
  EVENT
  ADMIN
  FIELD
  MEETING
  DEADLINE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  BLOCKED
  COMPLETED
  CANCELLED
}

model CalendarEvent {
  id             String   @id @default(uuid())
  organizationId String
  title          String
  description    String?
  startDate      DateTime
  endDate        DateTime
  location       String?
  type           CalendarEventType
  isAllDay       Boolean  @default(false)
  isRecurring    Boolean  @default(false)
  recurrenceRule String?
  
  attendees      User[]
  tasks          Task[]
}

enum CalendarEventType {
  MEETING
  EVENT
  DEADLINE
  SHIFT
  TRAINING
  PERSONAL
}
```

---

## 5. API Design

### 5.1 Convenciones

- **REST** para operaciones CRUD
- **GraphQL** para consultas complejas (reportes, dashboards)
- **WebSocket** para notificaciones en tiempo real

### 5.2 Endpoints Principales

```yaml
# Autenticación
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password

# Usuarios
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id

# Socios
GET    /api/v1/members
GET    /api/v1/members/:id
POST   /api/v1/members
PATCH  /api/v1/members/:id
DELETE /api/v1/members/:id
GET    /api/v1/members/:id/payments
POST   /api/v1/members/:id/payments

# Tareas
GET    /api/v1/tasks
GET    /api/v1/tasks/:id
POST   /api/v1/tasks
PATCH  /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
PATCH  /api/v1/tasks/:id/assign
PATCH  /api/v1/tasks/:id/complete

# Calendario
GET    /api/v1/calendar/events
POST   /api/v1/calendar/events
DELETE /api/v1/calendar/events/:id

# Pagos/Donaciones
POST   /api/v1/donations
POST   /api/v1/donations/:id/webhook
GET    /api/v1/payments
GET    /api/v1/payments/:id/receipt

# Contabilidad
GET    /api/v1/accounting/plan
POST   /api/v1/accounting/plan
GET    /api/v1/accounting/movements
POST   /api/v1/accounting/movements
GET    /api/v1/accounting/balance
GET    /api/v1/accounting/income-statement
GET    /api/v1/accounting/reports/sii-f29
```

### 5.3 Respuestas API

```typescript
// Respuesta exitosa
{
  "success": true,
  "data": { /* datos */ },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}

// Respuesta de error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Datos inválidos",
    "details": [/* errores de validación */]
  }
}
```

---

## 6. Seguridad

### 6.1 Autenticación

- **JWT** con access tokens (15 min) y refresh tokens (7 días)
- **HTTP-only cookies** para refresh tokens
- **2FA** opcional con TOTP
- **Session management** con Redis

### 6.2 Autorización

- **RBAC** (Role-Based Access Control)
- **Permisos granulares** por módulo y acción
- **Row-level security** en PostgreSQL para multi-tenancy

### 6.3 Protección de Datos

- **Encriptación** AES-256 para datos sensibles
- **TLS 1.3** para todas las comunicaciones
- **Hash** con Argon2 para contraseñas
- **Masking** de datos en logs

### 6.4 Rate Limiting

```typescript
// Configuración Nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/s;
limit_req_zone $binary_remote_addr zone=auth:10m rate=10r/s;

// Por endpoint
/auth/*     -> 10 req/min
/api/*      -> 100 req/s
/webhook/*  -> 1000 req/min
```

---

## 7. Desempeño y Calidad

### 7.1 Métricas Objetivo

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| **TTFB** | < 200ms | Prometheus |
| **P95 Latency** | < 500ms | Prometheus |
| **P99 Latency** | < 1s | Prometheus |
| **Error Rate** | < 0.1% | Loki |
| **Uptime** | 99.9% | Uptime Kuma |
| **LCP** | < 2.5s | Web Vitals |
| **FID** | < 100ms | Web Vitals |
| **CLS** | < 0.1 | Web Vitals |

### 7.2 Estrategias de Optimización

#### Backend
- **Cache Redis** para consultas frecuentes (TTL: 5-60 min)
- **Database indexing** en todas las FK y columnas de búsqueda
- **Connection pooling** (pgBouncer si es necesario)
- **Query optimization** con Prisma select específico
- **Bulk operations** para inserciones masivas

#### Frontend
- **Code splitting** por ruta y módulo
- **Lazy loading** de componentes pesados
- **Image optimization** (WebP, lazy loading)
- **Static generation** para landing pages
- **SWR/React Query** para cache del lado del cliente

#### Base de Datos
- **Partitioning** por organización para tablas grandes
- **Archiving** de datos históricos (> 2 años)
- **Vacuum automático** configurado
- **Read replicas** para reportes pesados

### 7.3 Testing

| Tipo | Herramienta | Cobertura Mínima |
|------|-------------|------------------|
| **Unit Tests** | Jest | 80% |
| **Integration Tests** | Jest + Supertest | 70% |
| **E2E Tests** | Playwright | Flujos críticos |
| **Visual Tests** | Playwright | Componentes UI |
| **Load Tests** | k6 | 1000 usuarios concurrentes |
| **Security Tests** | OWASP ZAP | Vulnerabilidades críticas |

### 7.4 Code Quality

```yaml
# ESLint + Prettier
- Reglas estrictas de TypeScript
- Import sorting automático
- No any implícitos
- Cyclomatic complexity < 10

# SonarQube (opcional)
- Code smells < 50
- Duplicación < 3%
- Vulnerabilidades: 0
- Bugs: 0
```

---

## 8. CI/CD Pipeline

### 8.1 GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
      redis:
        image: redis:7
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm test:coverage

  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm build

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - deploy to staging

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - deploy to production
```

### 8.2 Estrategia de Deploy

- **Staging**: Auto-deploy desde `develop`
- **Production**: Auto-deploy desde `main` con aprobación
- **Rollback**: Automático si error rate > 5% en 5 min
- **Blue-Green**: Para cero downtime

---

## 9. Infraestructura en Servidor Fenix

### 9.1 Especificaciones Mínimas

| Recurso | Mínimo | Recomendado |
|---------|--------|-------------|
| **CPU** | 4 cores | 8 cores |
| **RAM** | 8 GB | 16 GB |
| **Storage** | 100 GB SSD | 500 GB NVMe |
| **Network** | 100 Mbps | 1 Gbps |

### 9.2 Docker Compose (Producción)

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - certbot-www:/var/www/certbot
    depends_on:
      - api
      - web

  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    environment:
      - NEXT_PUBLIC_API_URL=/api

  postgres:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=impacta
      - POSTGRES_USER=impacta
      - POSTGRES_PASSWORD=${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}

volumes:
  postgres_data:
  redis_data:
  prometheus_data:
  grafana_data:
  certbot-www:
```

---

## 10. Monitoreo y Alertas

### 10.1 Dashboards Grafana

1. **Overview**: Métricas generales del sistema
2. **API Performance**: Latencia, throughput, errores
3. **Database**: Conexiones, queries lentas, locks
4. **Frontend**: Web Vitals, errores de JS
5. **Business**: Usuarios activos, donaciones, eventos

### 10.2 Alertas Críticas

| Alerta | Condición | Canal |
|--------|-----------|-------|
| API Down | Health check falla x 2 min | SMS, Email |
| Error Rate > 5% | En ventana de 5 min | Slack, Email |
| Latencia P95 > 2s | En ventana de 10 min | Slack |
| DB Connection Full | > 90% conexiones usadas | Slack, Email |
| Disk > 85% | Espacio disponible | Email |
| Backup Fallido | Backup diario falla | Email |

---

## 11. Backup y Recovery

### 11.1 Estrategia de Backup

| Tipo | Frecuencia | Retención | Ubicación |
|------|------------|-----------|-----------|
| **Database** | Cada 6 horas | 30 días | Local + S3 |
| **Archivos** | Diario | 90 días | S3 |
| **Logs** | Diario | 7 días | Local |
| **Config** | On change | 10 versiones | Git + S3 |

### 11.2 RTO/RPO

| Métrica | Objetivo |
|---------|----------|
| **RTO** (Recovery Time Objective) | 4 horas |
| **RPO** (Recovery Point Objective) | 6 horas |

### 11.3 Script de Backup

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres"

# Backup PostgreSQL
pg_dump -h postgres -U impacta impacta | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup a S3 (opcional)
aws s3 cp $BACKUP_DIR/db_$DATE.sql.gz s3://impacta-backups/postgres/

# Limpiar backups antiguos (> 30 días)
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

---

## 12. Consideraciones Legales (Chile)

### 12.1 Protección de Datos

- Cumplimiento **Ley 19.628** (Protección de la Vida Privada)
- Registro de bases de datos en **Registro Nacional de Bancos de Datos**
- Consentimiento explícito para tratamiento de datos
- Derecho a suprimir datos (derecho al olvido)

### 12.2 Contabilidad

- Libros contables según **Normas Chilenas de Contabilidad**
- Exportación de datos para **SII** (Formularios F29, F39)
- Certificados para **Ley 19.885** (Donaciones)
- Rendición de cuentas para **Ministerio de Justicia**

### 12.3 Transacciones

- **Ley 19.799** (Documentos Electrónicos)
- Boletas/facturas electrónicas (integración con SII)
- Comprobantes de donación con valor legal

---

## 13. Escalabilidad

### 13.1 Escalabilidad Horizontal

```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                        │
│                    (Nginx / HAProxy)                    │
└─────────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
   ┌──────────┐  ┌──────────┐  ┌──────────
   │  API #1  │  │  API #2  │  │  API #3  │
   └──────────  └──────────┘  └──────────┘
         │              │              │
         └──────────────┼──────────────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │   Redis  │  │ Postgres │  │   MinIO  │
   │  Cluster │  │  Cluster │  │ Cluster  │
   └──────────┘  └──────────  └──────────┘
```

### 13.2 Puntos de Escalabilidad

1. **API**: Múltiples instancias detrás de load balancer
2. **Redis**: Cluster mode para > 10GB datos
3. **PostgreSQL**: Read replicas para consultas
4. **Archivos**: MinIO cluster o S3 externo
5. **Colas**: Múltiples workers para BullMQ

---

*Documento de arquitectura para el sistema SaaS de ONG Impacta+*
