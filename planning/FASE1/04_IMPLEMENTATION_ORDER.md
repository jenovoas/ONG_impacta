# FASE 1 — Orden de Implementación
## Impacta+ SaaS

> Principios aplicados: SOLID (dependencias explícitas) · ITIL (gestión del cambio) · ISO 25010 (calidad incremental)
> Cada sprint entrega valor funcional completo (backend + frontend del módulo).
> **Implementar en este orden exacto. No adelantar módulos.**

---

## Visión general (6-8 semanas)

```
Semana 1    [INFRA]     Setup, DB, Auth backend
Semana 2    [AUTH UI]   Login, sesión, shell del dashboard
Semana 3    [SOCIOS]    CRUD socios + voluntarios + cuotas
Semana 4    [PAGOS]     Donaciones + campañas + pasarelas
Semana 5    [EVENTOS]   Eventos + rifas + check-in
Semana 6    [SOCIAL]    Ayuda social + ecología + especies
Semana 7    [CONTABLE]  Contabilidad + reportes
Semana 8    [LANDING]   Landing pública + super-admin + QA
```

---

## Sprint 1 — Infraestructura y Auth (días 1–5)

### Objetivo
Sistema corriendo localmente. Auth completo. Shell del dashboard.

### Dependencias previas
Ninguna.

### Tareas en orden

**Día 1 — Monorepo y BD**
- [ ] Inicializar monorepo Turborepo + pnpm (ver `00_SETUP.md`)
- [ ] Levantar Docker Compose (Postgres, Redis, MinIO)
- [ ] Crear `packages/database` con `schema.prisma` completo (ver `01_DB_SCHEMA.md`)
- [ ] Ejecutar `prisma migrate dev --name init`
- [ ] Crear seed básico (1 ONG, 1 Super Admin, plan de cuentas base)

**Día 2 — Backend Auth**
- [ ] Crear `apps/api` con NestJS
- [ ] Instalar dependencias del API (ver `00_SETUP.md` sección 10)
- [ ] Implementar `TenantMiddleware`: extrae `organizationId` del JWT y ejecuta `SET app.current_org_id`
- [ ] Implementar `AuthModule`: login, refresh, logout, forgot-password, reset-password
- [ ] Implementar `JwtStrategy` y `JwtRefreshStrategy` (passport-jwt)
- [ ] Implementar `RolesGuard` y `PermissionsGuard`
- [ ] Implementar `AuditInterceptor`: escribe en `audit_logs` en todo CUD
- [ ] Swagger configurado en `/api/docs`

**Día 3 — Frontend Shell**
> ⚠️ Referencia visual: `proto/app-shell.html` (crear en Stitch antes de este día — ver `planning/UI_PROTOTYPES_STITCH.md`)
> ⚠️ `/proto` es de SOLO LECTURA. Recrear en React, no copiar HTML.
- [ ] **[PREVIO]** Crear prototipo `app-shell.html` en Stitch y guardarlo en `/proto/`
- [ ] Crear `apps/web` con Vite + React
- [ ] Instalar dependencias frontend (ver `00_SETUP.md` sección 10)
- [ ] Instalar y configurar shadcn/ui (ver `00_SETUP.md` sección 10)
- [ ] Aplicar `tailwind.config.ts` y `index.css` exactos (ver `03_DESIGN_TOKENS.md`)
- [ ] Crear `AppShell` con `Sidebar` + `Topbar` (rutas vacías, solo layout)
- [ ] Configurar `react-router-dom` v6 con rutas protegidas
- [ ] Configurar `TanStack Query` + `axios` con interceptores de refresh token

**Día 4 — Frontend Auth**
> ⚠️ Referencia visual: `proto/auth-login.html`, `proto/auth-2fa.html` (crear en Stitch antes — ver `planning/UI_PROTOTYPES_STITCH.md`)
> ⚠️ `/proto` es de SOLO LECTURA. Recrear en React, no copiar HTML.
- [ ] **[PREVIO]** Crear prototipos `auth-login.html` y `auth-2fa.html` en Stitch y guardarlos en `/proto/`
- [ ] Pantalla `/auth/login` (ver spec `modules/M00_AUTH.md`)
- [ ] Pantalla `/auth/recuperar` y `/auth/nueva-contrasena`
- [ ] Pantalla `/auth/2fa`
- [ ] `authStore` con Zustand: `user`, `accessToken`, `isAuthenticated`, `login()`, `logout()`, `refreshToken()`
- [ ] Interceptor axios: adjunta token, reintenta con refresh si 401
- [ ] Ruta protegida: redirige a `/auth/login` si no autenticado

**Día 5 — Dashboard home y configuración**
> ⚠️ Referencia visual: `proto/dashboard-general.html` (disponible en `/proto/`)
> ⚠️ `/proto` es de SOLO LECTURA. Recrear en React, no copiar HTML.
- [ ] Pantalla `/dashboard` con widgets vacíos (StatCards en skeleton)
- [ ] `GET /auth/me` conectado → muestra nombre ONG en Topbar
- [ ] Theme toggle (dark/light) persistido en localStorage
- [ ] i18n básico: `es.json` y `en.json` con las claves del shell y auth

---

## Sprint 2 — Socios, Voluntarios y Cuotas (días 6–10)

### Objetivo
Admin puede registrar socios, asignar cuotas y registrar pagos.

### Dependencias
Sprint 1 completo.

### Tareas

**Backend**
- [ ] `MembersModule`: CRUD completo + búsqueda + paginación
- [ ] `MemberPaymentsService`: registrar pago, calcular mora, estado del período
- [ ] `VolunteersModule`: CRUD completo
- [ ] `RolesModule`: CRUD de roles custom + asignación
- [ ] Validaciones: RUT chileno (dígito verificador), email único por ONG

**Frontend**
- [ ] `/socios` — `DataTable` con columnas: número, nombre, email, cargo, estado, cuota actual
- [ ] `/socios/nuevo` y `/socios/:id/editar` — `FormStep` (3 pasos: datos, membresía, cargo)
- [ ] `/socios/:id` — Perfil con tabs: Información | Cuotas | Eventos | Historial
- [ ] Widget "Pagar cuota" en perfil: selecciona período + método + monto
- [ ] `/voluntarios` — DataTable con filtros por habilidades y área
- [ ] `/voluntarios/nuevo` y `/voluntarios/:id` — misma lógica que socios
- [ ] `/organigrama` — árbol visual con cargos (librería: react-organizational-chart)

---

## Sprint 3 — Donaciones, Campañas y Pagos Online (días 11–15)

### Objetivo
Admin registra donaciones. Donante externo puede donar en línea.

### Dependencias
Sprint 1 completo. Credenciales MercadoPago y/o Stripe configuradas en `.env`.

### Tareas

**Backend**
- [ ] `DonationsModule`: CRUD + stats + conciliación
- [ ] `CampaignsModule`: CRUD + cálculo de progreso en tiempo real
- [ ] `PaymentsService`: abstracción de pasarelas (OCP — cada proveedor es una clase separada)
  - [ ] `MercadoPagoProvider implements IPaymentProvider`
  - [ ] `StripeProvider implements IPaymentProvider`
  - [ ] `PayPalProvider implements IPaymentProvider`
- [ ] Webhooks: endpoints públicos con verificación de firma HMAC
- [ ] `CertificatesService`: genera PDF de certificado de donación (librería: `puppeteer` o `@react-pdf/renderer`)
- [ ] BullMQ job: envío de email de confirmación post-donación

**Frontend**
- [ ] `/donaciones` — dashboard con KPIs + gráfico de serie temporal + últimas transacciones
- [ ] `/donaciones/transacciones` — DataTable filtrable por campaña, método, fecha, estado
- [ ] `/donaciones/nueva` — formulario de donación manual interna
- [ ] `/donaciones/campanas` — lista de campañas con progress bar (termómetro)
- [ ] `/donaciones/campanas/nueva` — formulario de campaña
- [ ] Widget `DonationThermometer` en detalle de campaña

---

## Sprint 4 — Eventos y Rifas (días 16–20)

### Objetivo
Admin crea eventos y rifas. Participantes pueden inscribirse y comprar boletos.

### Dependencias
Sprint 3 completo (reutiliza lógica de pagos).

### Tareas

**Backend**
- [ ] `EventsModule`: CRUD + check-in por código QR o email
- [ ] `EventRegistrationsService`: inscripción con pago integrado, generación de ticket digital
- [ ] `RafflesModule`: CRUD + venta de boletos + sorteo aleatorio verificable
- [ ] BullMQ job: recordatorio de evento (24h antes)
- [ ] BullMQ job: notificación a ganador de rifa

**Frontend**
- [ ] `/eventos` — grid de tarjetas `EventCard` con filtros
- [ ] `/eventos/nuevo` — `FormStep` 3 pasos: info | recaudación | inscripciones
- [ ] `/eventos/:id` — detalle con tabs: Info | Inscriptos | Check-in | Recaudación
- [ ] `/eventos/:id/checkin` — vista QR scanner (`expo-barcode-scanner` no aplica aquí, usar `html5-qrcode`) + lista manual
- [ ] `/rifas` — lista con estado y progreso de ventas
- [ ] `/rifas/nueva` — formulario con gestión de premios (array dinámico)
- [ ] `/rifas/:id/sorteo` — pantalla con animación de sorteo + acta generada

---

## Sprint 5 — Ayuda Social, Ecología y Especies (días 21–25)

### Objetivo
Registro de beneficiarios, proyectos ecológicos y catálogo de especies.

### Dependencias
Sprint 1 completo.

### Tareas

**Backend**
- [ ] `SocialAidModule`: beneficiarios + deliveries + mapa
- [ ] `EcologyModule`: proyectos + actividades + métricas
- [ ] `SpeciesModule`: especies + avistamientos + registro de poblaciones
- [ ] `UploadsModule`: subida de imágenes y documentos a MinIO/S3

**Frontend**
- [ ] `/ayuda-social` — DataTable de beneficiarios + mapa Leaflet lateral
- [ ] `/ayuda-social/nuevo` — formulario + geolocalización con mapa
- [ ] `/ayuda-social/:id` — historial de entregas + `SignaturePad` + `FileUpload`
- [ ] `/ecologia` — lista de proyectos con KPIs (árboles, área, voluntarios)
- [ ] `/ecologia/:id` — actividades + galería + métricas acumuladas
- [ ] `/especies` — catálogo con grid + filtros por categoría y estado de conservación
- [ ] `/especies/:id` — ficha técnica + galería + mapa de avistamientos + gráfico de población
- [ ] `/especies/avistamientos/nuevo` — formulario con GPS + upload de fotos

---

## Sprint 6 — Contabilidad (días 26–30)

### Objetivo
Plan de cuentas, libro diario, balances y exportación SII.

### Dependencias
Sprint 1 completo. Seed con plan de cuentas estándar para ONGs chilenas.

### Tareas

**Backend**
- [ ] `AccountingModule`: plan de cuentas jerárquico + libro diario + validaciones
- [ ] `JournalService`: crear asiento, validar partida doble, contabilizar
- [ ] `ReportsService`: libro mayor, balance de comprobación, balance general, estado de resultados
- [ ] `SIIService`: generación de archivos F29 y F39

**Frontend**
- [ ] `/contabilidad` — dashboard: totales por tipo de cuenta + alertas
- [ ] `/contabilidad/cuentas` — árbol de cuentas editable (expandir/colapsar)
- [ ] `/contabilidad/diario` — DataTable de asientos + filtros
- [ ] `/contabilidad/diario/nuevo` — formulario de asiento con filas dinámicas + validación partida doble en tiempo real
- [ ] `/contabilidad/mayor` — selector de cuenta + tabla de movimientos
- [ ] `/contabilidad/balance` — balance de comprobación + balance general + estado de resultados
- [ ] `/contabilidad/sii` — formulario de parámetros + botón de descarga

---

## Sprint 7 — Landing Pública + Reportes + Super Admin (días 31–35)

### Objetivo
Landing pública por ONG. Reportes exportables. Panel super-admin.

### Dependencias
Sprints 1-6.

### Tareas

**Backend**
- [ ] `LandingModule`: endpoint público `/public/:slug` sin autenticación
- [ ] `ReportsModule`: endpoints para reportes agregados + exportación CSV/PDF
- [ ] `AdminModule`: gestión de ONGs, planes, usuarios globales

**Frontend — apps/landing (Next.js)**
- [ ] `/` — landing page de Impacta+ (la plataforma, no una ONG)
- [ ] `/ong/[slug]` — landing pública de cada ONG con datos dinámicos
- [ ] `/ong/[slug]/donar` — formulario de donación pública embebido
- [ ] `/ong/[slug]/eventos` — eventos públicos de la ONG
- [ ] `/registro` — formulario de registro de nueva ONG

**Frontend — apps/web (Reportes)**
- [ ] `/reportes` — centro de reportes con lista
- [ ] `/reportes/financiero` — ingresos, egresos, balance con gráficos + exportar
- [ ] `/reportes/socios` — altas, bajas, morosidad
- [ ] `/reportes/impacto` — beneficiarios, voluntarios, actividades, especies

**Frontend — apps/admin (Super Admin)**
- [ ] Layout propio con sidebar reducido
- [ ] `/` — métricas globales: ONGs, usuarios, transacciones
- [ ] `/ongs` — DataTable de todas las ONGs
- [ ] `/ongs/:id` — detalle + cambio de plan + activar/desactivar

---

## Sprint 8 — QA, Performance y Despliegue (días 36–40)

### Objetivo
Sistema estable, testeado y desplegado en producción.

### Tareas

**Testing**
- [ ] Tests unitarios backend: servicios críticos (auth, pagos, contabilidad) — objetivo 70%
- [ ] Tests de integración: flujos de pago end-to-end con sandbox de pasarelas
- [ ] Tests E2E Playwright: login, crear socio, registrar donación, crear evento
- [ ] Test de carga k6: 200 usuarios concurrentes en endpoints críticos

**Performance**
- [ ] Lighthouse score web > 85 (performance, accessibility)
- [ ] Configurar caché Redis en endpoints de alta lectura (GET /members, /species)
- [ ] Lazy loading de rutas en React (React.lazy + Suspense)
- [ ] Optimizar imágenes con MinIO transformaciones

**Seguridad**
- [ ] Scan OWASP ZAP en staging
- [ ] Revisar headers de seguridad (Helmet.js)
- [ ] Confirmar que RLS funciona correctamente (test cross-tenant)

**Despliegue**
- [ ] Configurar `docker-compose.prod.yml` con variables de entorno de producción
- [ ] Configurar Nginx con SSL (Let's Encrypt)
- [ ] GitHub Actions CI/CD: test → build → deploy en push a `main`
- [ ] Configurar Prometheus + Grafana con dashboards básicos
- [ ] Backup automático de PostgreSQL cada 6 horas

---

## Criterios de aceptación por sprint

| Sprint | Criterio |
|--------|----------|
| 1 | Login funcional. Dashboard vacío con nombre ONG. |
| 2 | Admin puede crear socio y registrar pago de cuota. |
| 3 | Donante externo puede donar con MercadoPago y recibir email. |
| 4 | Admin crea evento, voluntario se inscribe, check-in por QR. |
| 5 | Admin registra beneficiario y entrega de ayuda con foto. |
| 6 | Asiento contable cuadra partida doble. Balance generado. |
| 7 | Landing pública muestra datos de ONG. Reporte exportable en PDF. |
| 8 | 0 vulnerabilidades críticas OWASP. CI/CD verde. Uptime 99.9%. |

---

## Reglas del proceso (ITIL — Change Management)

1. **Una rama por feature** — `feature/M01-socios`, nunca commits directos a `main`
2. **PR mínimo con**: descripción, screenshot/video, tests pasando, review de al menos 1 persona
3. **Merge solo con CI verde** — lint + test + build deben pasar
4. **Changelog actualizado** en cada merge a `main`
5. **Variables de entorno** — nunca en el código, siempre en `.env` (no commiteado)
6. **Secretos de producción** — en GitHub Secrets, no en `.env.example`
