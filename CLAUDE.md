# Impacta+ — Contexto del Proyecto

## 🚨 TIER-0 — REGLAS DE ORO (LEER ANTES DE CUALQUIER ACCIÓN)

Estas reglas se violan dentro de commits en git. NO son negociables, NO hay excepción.

### PROHIBIDO ABSOLUTO en el servidor Fenix

1. **NUNCA** ejecutar `podman compose up --build` ni `podman build` en producción.
   → Los builds (especialmente argon2/C++) saturan CPU y botan los otros servicios.
2. **NUNCA** ejecutar `podman compose down` en producción.
   → Interrumpe la red `proxy` compartida y mata el routing de Traefik para TODOS los servicios.
3. **NUNCA** modificar Traefik, puertos 80/443, ni redes globales (`proxy`).
   → `pinguinoseguro.cl` y `laespiguita.cl` comparten esta infraestructura.

### Flujo de deploy OBLIGATORIO

- **BUILD → siempre en local** (esta máquina):
  `podman build -t impacta-api:latest -f apps/api/Dockerfile .`
- **TRANSFERIR** imagen al servidor (podman save → scp/rsync → podman load)
- **EN SERVIDOR** solo ejecutar: `podman compose up -d` (sin --build)

### Si un servicio de producción está caído

- NO tocar Traefik
- `podman restart <nombre-contenedor>` del servicio afectado
- Revisar logs: `podman logs --tail 50 <contenedor>`

---

## 0.5 TIER-0 SLA FREEZE (Sentinel Infra)

**Línea Roja Operativa**: Cualquier despliegue o comando de red desde **Impacta+** está sujeto a contratos de SLA en el servidor root (Fenix Node). Los dominios `pinguinoseguro.cl` y `laespiguita.cl` comparten proxy con este proyecto.

- Queda **ESTRICTAMENTE PROHIBIDO** alterar el motor de Traefik, reiniciar contenedores globales `proxy` o modificar puertos `80/443` compartidos bajo ninguna circunstancia. Caídas implican penalización financiera.

## Qué es

Plataforma SaaS multi-tenant para gestión integral de ONGs (socios, eventos, donaciones, contabilidad, ecología, app móvil). Dominio: `impacta.pinguinoseguro.cl`

## Stack

- **Monorepo:** Turborepo + pnpm
- **Frontend:** React 18 + Vite (dashboard), Next.js 14 (landing), shadcn/ui, TailwindCSS
- **Backend:** NestJS 10 + TypeScript, Prisma ORM, PostgreSQL 16, Redis 7, BullMQ
- **Mobile:** React Native + Expo SDK 50+, Expo Router
- **Infra:** Docker Compose, Nginx, GitHub Actions, Prometheus + Grafana
- **Pagos:** MercadoPago, PayPal, Stripe
- **Email:** SendGrid / Resend
- **Testing:** Jest, Supertest, Playwright (E2E), k6 (load)

## Estructura del monorepo

```
apps/web        → Dashboard principal (React + Vite)
apps/landing    → Landing pages (Next.js)
apps/api        → Backend (NestJS)
apps/mobile     → App móvil (React Native + Expo)
apps/admin      → Panel super-admin (React)
packages/ui     → Componentes compartidos
packages/database → Schema Prisma + migraciones
packages/auth   → Lógica de autenticación
packages/payments → Módulo de pagos
packages/accounting → Módulo contable chileno
packages/types  → Tipos TypeScript compartidos
```

## Multi-tenancy

Row-Level Security (RLS) en PostgreSQL. Cada ONG tiene datos completamente aislados.

## Autenticación y Seguridad

- JWT: access token 15min + refresh token 7 días
- RBAC con permisos granulares
- Contraseñas: Argon2
- 2FA: TOTP opcional

## Roles

`Super Admin` → `Admin ONG` → `Coordinador` → `Voluntario` / `Socio` / `Donante`

## Identidad Visual

- **Modo:** Oscuro por defecto / Claro opcional
- **Color primario:** `#00A8FF` (Azul Impacta)
- **Color acento:** `#00D4AA` (Verde Restore)
- **Fondo:** `#000000`, texto `#FFFFFF`
- **Fuente UI:** Inter | **Fuente títulos:** Montserrat
- **Iconos:** Lucide Icons

## Módulos (22 total, 3 fases)

**Fase 1 — MVP:** Socios/Voluntarios, Calendario/Tareas, Donaciones/Pagos, Contabilidad, Eventos, Ayuda Social, Rescate Ecológico, Biblioteca de Especies, Landing Page, i18n, App Móvil

**Fase 2 — Crecimiento:** Transparencia, Email Marketing, Logística/Inventarios, Voluntariado Corporativo, Crowdfunding

**Fase 3 — Madurez:** E-Learning, IA/Analytics, Emergencias, API Pública, CRM, Reportes avanzados

## Cumplimiento Legal (Chile)

- Ley 19.628 (datos personales)
- Ley 19.885 (donaciones — certificados)
- Normativa SII (F29, F39)
- Ministerio de Justicia (rendición de cuentas ONGs)

## Modelo de Negocio

| Plan | Precio |
|------|--------|
| Free | $0/mes — hasta 50 socios |
| Básico | $29/mes — hasta 200 socios |
| Pro | $79/mes — ilimitado, todos los módulos |
| Enterprise | Personalizado — white-label, API |

## Documentación

- `Impacta+PRD.md` — Requisitos completos (v6.0)
- `ARQUITECTURA_TECNICA.md` — Stack, modelo de datos, API
- `ARQUITECTURA_MOVIL_I18N.md` — React Native + i18n
- `DISENO_IDENTIDAD_VISUAL.md` — Sistema de diseño completo
- `docs/` — Documentos reales de actividades de la ONG

## Convenciones de commits

Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
