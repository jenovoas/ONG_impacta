# Impacta+

SaaS multi-tenant para ONGs — gestión de socios, donaciones, campañas, especies y misiones.
Detalle del producto: [Impacta+PRD.md](Impacta+PRD.md). Arquitectura: [ARQUITECTURA_TECNICA.md](ARQUITECTURA_TECNICA.md).

## Stack
- **Backend** — NestJS 11 + Prisma 5 + Postgres 16. Multi-tenant por AsyncLocalStorage + Prisma extension.
- **Landing** — Next.js 16 (standalone) + Tailwind v4.
- **Frontend** — Vite + React 19 + TanStack Query + React Router 7.
- **Infra** — podman rootless + traefik v3 en fenix (Rocky 9).

## Estructura
| Carpeta | Descripción |
|---|---|
| `backend/` | Servidor NestJS con lógica de negocio y API |
| `frontend/` | Aplicación de dashboard para ONGs |
| `landing/` | Sitio público de presentación |
| `prisma/` | Esquemas y migraciones de base de datos |

## Levantar local
```bash
docker-compose up -d postgres redis
cd backend && npm install && npx prisma migrate deploy && npm run prisma:seed && npm run start:dev
# otra terminal:
cd frontend && npm install && npm run dev
```
Frontend: http://localhost:5173 · Backend: http://localhost:3000

## Credenciales demo (solo dev)
- Org slug: `demo`
- Email: `admin@demo.impacta.cl`
- Password: `admin123`

## Endpoints productivos
| Servicio | URL |
|---|---|
| Landing | https://impacta.pinguinoseguro.cl |
| App | https://app-impacta.pinguinoseguro.cl |
| API | https://api-impacta.pinguinoseguro.cl |
| Health | https://api-impacta.pinguinoseguro.cl/health |

## Deploy (fenix)
```bash
podman build --network=host -t impacta-backend:latest backend/
podman-compose up -d backend
curl -s -o /dev/null -w "%{http_code}\n" https://api-impacta.pinguinoseguro.cl/health
```
(idem para `frontend` y `landing`).

## Tests
```bash
cd backend
npm run test           # unit
npm run test:setup     # aplica migraciones en schema "test"
npm run test:e2e       # integración
```

## Links
- Plan vivo: [PLAN.md](PLAN.md)
- Guía agentes: [AGENTS.md](AGENTS.md)
- Diseño: [DISENO_IDENTIDAD_VISUAL.md](DISENO_IDENTIDAD_VISUAL.md)
