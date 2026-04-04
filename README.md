<p align="center">
  <img src="img/logo.svg" alt="ONG Impacta+ Logo" width="280" />
</p>

<h1 align="center">ONG Impacta+</h1>

<p align="center">
  <strong>Plataforma SaaS Multi-tenant de Gestión Integral para ONGs</strong>
</p>

<p align="center">
  <em>Restaurando Nuestro Planeta 🌱</em>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/versión-6.0-blue?style=flat-square" alt="Versión"></a>
  <a href="#"><img src="https://img.shields.io/badge/estado-en%20desarrollo-orange?style=flat-square" alt="Estado"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/licencia-Apache%202.0-green?style=flat-square" alt="Licencia"></a>
  <a href="#"><img src="https://img.shields.io/badge/node-20.x%20LTS-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node"></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="#"><img src="https://img.shields.io/badge/NestJS-10.x-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS"></a>
  <a href="#"><img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"></a>
</p>

<p align="center">
  <a href="#-características">Características</a> •
  <a href="#-demo">Demo</a> •
  <a href="#%EF%B8%8F-stack-tecnológico">Stack</a> •
  <a href="#-arquitectura">Arquitectura</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-módulos">Módulos</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contribuir">Contribuir</a>
</p>

---

## 📋 Sobre el Proyecto

**ONG Impacta+** es una plataforma SaaS multi-tenant diseñada para centralizar y automatizar la gestión operativa de Organizaciones No Gubernamentales. Permite administrar eventos, donaciones, ayuda social, rescate ecológico, rifas digitales, recaudación de fondos, y mucho más — todo desde una única plataforma.

### 🎯 Problema que Resuelve

Las ONGs carecen de sistemas internos de administración que les permitan gestionar de manera eficiente sus operaciones diarias:

- 📋 Gestión de socios, voluntarios y beneficiarios
- 🎪 Administración de eventos y recaudación de fondos
- 💰 Control de donaciones y transparencia financiera
- 🌿 Organización de actividades de ayuda social y ecológica
- 🎟️ Digitalización de rifas y actividades de fundraising
- 🦎 Registro y estudio de especies nativas (flora y fauna)
- 📊 Seguimiento de poblaciones y evaluación de impacto ambiental

### 💡 Visión

Convertirse en la **plataforma líder** para la gestión de ONGs en la región, ofreciendo una solución todo-en-uno que permita a las organizaciones enfocarse en su misión social.

---

## ✨ Características

<table>
<tr>
<td width="50%">

### 🏢 Gestión Organizacional
- Administración de socios y voluntarios
- Asignación de roles, cargos y jerarquías
- Organigrama interactivo
- Calendario y coordinador de tareas

</td>
<td width="50%">

### 💳 Pagos & Donaciones
- Sistema unificado web + interno
- Integración MercadoPago, PayPal & Stripe
- Donaciones recurrentes y en especie
- Conciliación automática de transacciones

</td>
</tr>
<tr>
<td width="50%">

### 📊 Contabilidad Chilena
- Plan de cuentas según normativa chilena
- Libro diario, mayor y balance automáticos
- Exportación para SII (F29, F39)
- Certificados Ley de Donaciones (19.885)

</td>
<td width="50%">

### 🌿 Ecología & Biodiversidad
- Catálogo de flora y fauna nativa
- Registro de avistamientos geolocalizados
- Seguimiento de poblaciones
- Evaluación de impacto ambiental

</td>
</tr>
<tr>
<td width="50%">

### 📱 App Móvil
- React Native (iOS & Android)
- Notificaciones push
- Check-in/Check-out en eventos
- Modo offline con sincronización

</td>
<td width="50%">

### 🌐 Multi-idioma
- Español e Inglés
- Detección automática de idioma
- Selector manual en UI
- i18n en web y app móvil

</td>
</tr>
</table>

---

## 🖥️ Demo

| Plataforma | URL |
|:---:|:---:|
| 🌐 **Web** | [`impacta.pinguinoseguro.cl`](https://impacta.pinguinoseguro.cl) |
| 📱 **App iOS** | *Próximamente* |
| 🤖 **App Android** | *Próximamente* |

---

## ⚙️ Stack Tecnológico

### Frontend

| Tecnología | Propósito |
|:---:|---|
| ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black) | Librería UI principal |
| ![Next.js](https://img.shields.io/badge/Next.js-14.x-000000?style=flat-square&logo=next.js&logoColor=white) | Landing Page, SSR, SEO |
| ![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tool para dashboard |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white) | Tipado estático |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Estilos utilitarios |
| ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000?style=flat-square) | Componentes UI |

### Backend

| Tecnología | Propósito |
|:---:|---|
| ![Node.js](https://img.shields.io/badge/Node.js-20.x%20LTS-339933?style=flat-square&logo=node.js&logoColor=white) | Runtime |
| ![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?style=flat-square&logo=nestjs&logoColor=white) | Framework backend |
| ![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=flat-square&logo=prisma&logoColor=white) | ORM type-safe |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=flat-square&logo=postgresql&logoColor=white) | Base de datos principal |
| ![Redis](https://img.shields.io/badge/Redis-7.x-DC382D?style=flat-square&logo=redis&logoColor=white) | Cache, colas, sesiones |
| ![BullMQ](https://img.shields.io/badge/BullMQ-5.x-red?style=flat-square) | Colas de trabajos |

### Móvil

| Tecnología | Propósito |
|:---:|---|
| ![React Native](https://img.shields.io/badge/React%20Native-latest-61DAFB?style=flat-square&logo=react&logoColor=black) | Framework multi-plataforma |
| ![Expo](https://img.shields.io/badge/Expo-SDK%2050+-000020?style=flat-square&logo=expo&logoColor=white) | Herramientas de build |

### Infraestructura

| Tecnología | Propósito |
|:---:|---|
| ![Docker](https://img.shields.io/badge/Docker-24.x-2496ED?style=flat-square&logo=docker&logoColor=white) | Contenedores |
| ![Nginx](https://img.shields.io/badge/Nginx-1.25.x-009639?style=flat-square&logo=nginx&logoColor=white) | Reverse proxy, SSL |
| ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?style=flat-square&logo=github-actions&logoColor=white) | Pipeline de CI/CD |
| ![Prometheus](https://img.shields.io/badge/Prometheus-2.x-E6522C?style=flat-square&logo=prometheus&logoColor=white) | Métricas |
| ![Grafana](https://img.shields.io/badge/Grafana-10.x-F46800?style=flat-square&logo=grafana&logoColor=white) | Dashboards de monitoreo |

---

## 🏗 Arquitectura

### Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────────┐
│                      CAPA DE PRESENTACIÓN                          │
│   ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────┐ │
│   │ Landing Page │  │ Dashboard Web│  │ Portal Socio │  │App Móvl│ │
│   │  (Next.js)  │  │(React + Vite)│  │   (React)    │  │(Expo)  │ │
│   └─────────────┘  └──────────────┘  └──────────────┘  └────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CAPA DE API GATEWAY                           │
│         Nginx (Reverse Proxy + SSL + Rate Limiting + Cache)        │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA DE APLICACIÓN (Backend)                     │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐ ┌────────┐ ┌──────────┐  │
│   │ Auth │ │ Core │ │Pagos │ │Contable│ │Eventos │ │Ecología  │  │
│   └──────┘ └──────┘ └──────┘ └────────┘ └────────┘ └──────────┘  │
│              NestJS + TypeScript + REST/GraphQL + WebSocket         │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        CAPA DE DATOS                                │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│   │  PostgreSQL  │  │    Redis     │  │  MinIO / S3  │             │
│   │  (Principal) │  │ (Cache/Colas)│  │  (Archivos)  │             │
│   └──────────────┘  └──────────────┘  └──────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
```

### Estrategia Multi-tenant

- **Row-Level Security** en PostgreSQL para aislamiento total de datos
- Cada ONG opera en un espacio seguro y completamente aislado
- Arquitectura preparada para escalabilidad horizontal

### Estructura del Monorepo (Turborepo)

```
impacta-saas/
├── apps/
│   ├── web/                    # Dashboard principal (React + Vite)
│   ├── landing/                # Landing pages (Next.js)
│   ├── api/                    # Backend API (NestJS)
│   ├── mobile/                 # App móvil (React Native + Expo)
│   └── admin/                  # Panel super-admin (React)
├── packages/
│   ├── ui/                     # Componentes UI compartidos
│   ├── database/               # Schema Prisma, migraciones
│   ├── auth/                   # Lógica de autenticación
│   ├── payments/               # Módulo de pagos
│   ├── accounting/             # Módulo contable chileno
│   ├── types/                  # Tipos TypeScript compartidos
│   └── utils/                  # Utilidades compartidas
├── docker/                     # Configuraciones Docker
├── infra/                      # Docker Compose, scripts
├── docs/                       # Documentación del proyecto
└── .github/workflows/          # CI/CD con GitHub Actions
```

---

## 📦 Módulos

El sistema está compuesto por **22 módulos** organizados en 3 fases de desarrollo:

### 🟢 Fase 1 — Core MVP (5-7 semanas)

| # | Módulo | Descripción |
|:-:|--------|-------------|
| 1 | **Socios y Voluntarios** | Registro, membresías, perfiles, asignación de tareas, roles y cargos |
| 2 | **Calendario y Tareas** | Vista mensual/semanal, tareas recurrentes, seguimiento de estado |
| 3 | **Donaciones y Pagos** | Sistema unificado web + interno, pasarelas de pago, conciliación |
| 4 | **Contabilidad** | Plan de cuentas, libro diario/mayor, balances, informes SII |
| 5 | **Eventos y Recaudación** | Creación de eventos, inscripciones, termómetro de donaciones |
| 6 | **Ayuda Social** | Registro de beneficiarios, seguimiento de casos, entregas |
| 7 | **Rescate Ecológico** | Proyectos de conservación, métricas de impacto |
| 8 | **Biblioteca de Especies** | Catálogo flora/fauna, avistamientos, impacto ambiental |
| 9 | **Landing Page** | Generador automático con personalización de marca |
| 10 | **i18n** | Internacionalización Español/Inglés |
| 11 | **App Móvil** | React Native, notificaciones push, modo offline |

### 🟡 Fase 2 — Crecimiento (4-6 semanas)

| # | Módulo | Descripción |
|:-:|--------|-------------|
| 12 | **Transparencia** | Dashboard público, uso de fondos, informes anuales |
| 13 | **Email Marketing** | Newsletter, automatización, segmentación |
| 14 | **Logística e Inventarios** | Control de stock, bodegas, distribución |
| 15 | **Voluntariado Corporativo** | Portal empresas, jornadas, reportes |
| 16 | **Crowdfunding** | Campañas virales, embajadores, social sharing |

### 🔵 Fase 3 — Madurez e Innovación (4-5 semanas)

| # | Módulo | Descripción |
|:-:|--------|-------------|
| 17 | **E-Learning** | LMS, cursos online, certificaciones |
| 18 | **IA y Analytics** | Predicción de donaciones, churn, chatbot |
| 19 | **Emergencias** | Alertas masivas, protocolos, movilización |
| 20 | **API Pública** | API REST, webhooks, developer portal |
| 21 | **CRM** | Gestión de contactos, proveedores, compras |
| 22 | **Reportes y Analytics** | Dashboard, financieros, impacto, exportación |

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** 20.x LTS
- **pnpm** 8.x+
- **Docker** y **Docker Compose**
- **PostgreSQL** 16.x (o vía Docker)
- **Redis** 7.x (o vía Docker)

### Inicio Rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/ONG_impacta.git
cd ONG_impacta

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Levantar servicios con Docker
docker compose up -d

# 5. Ejecutar migraciones de base de datos
pnpm db:migrate

# 6. Seed de datos iniciales
pnpm db:seed

# 7. Iniciar en modo desarrollo
pnpm dev
```

### Variables de Entorno

```env
# Base de Datos
DATABASE_URL=postgresql://impacta:password@localhost:5432/impacta

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=tu-secreto-super-seguro
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Pagos
MERCADOPAGO_ACCESS_TOKEN=tu-token
PAYPAL_CLIENT_ID=tu-client-id
STRIPE_SECRET_KEY=tu-secret-key

# Email
SENDGRID_API_KEY=tu-api-key

# App
APP_URL=https://impacta.pinguinoseguro.cl
NODE_ENV=development
```

### Servicios Docker

```bash
# Levantar todos los servicios
docker compose up -d

# Ver logs
docker compose logs -f api

# Detener servicios
docker compose down
```

---

## 🎨 Identidad Visual

| Elemento | Valor |
|----------|-------|
| **Color Primario** | ![#00A8FF](https://via.placeholder.com/12/00A8FF/00A8FF) `#00A8FF` — Azul Impacta |
| **Color Acento** | ![#00D4AA](https://via.placeholder.com/12/00D4AA/00D4AA) `#00D4AA` — Verde Restore |
| **Fondo Base** | ![#000000](https://via.placeholder.com/12/000000/000000) `#000000` — Negro |
| **Texto** | ![#FFFFFF](https://via.placeholder.com/12/FFFFFF/FFFFFF) `#FFFFFF` — Blanco |
| **Fuente Principal** | [Inter](https://fonts.google.com/specimen/Inter) |
| **Fuente Display** | [Montserrat](https://fonts.google.com/specimen/Montserrat) |
| **Modo** | 🌙 Oscuro (default) / ☀️ Claro |
| **Iconos** | Lucide Icons |

> 📄 Para detalles completos de diseño, ver [`DISENO_IDENTIDAD_VISUAL.md`](DISENO_IDENTIDAD_VISUAL.md)

---

## 👥 Roles de Usuario

| Rol | Descripción | Acceso |
|:---:|-------------|--------|
| 🛡️ **Super Admin** | Administrador de la plataforma SaaS | Todas las ONGs |
| 👑 **Admin ONG** | Administrador de una ONG | Su organización completa |
| 📋 **Coordinador** | Coordinador de área | Voluntarios y eventos |
| 🙋 **Voluntario** | Voluntario registrado | Eventos, perfil, tareas |
| 🤝 **Socio** | Socio con membresía | Beneficios, cuotas |
| 💝 **Donante** | Donante registrado | Historial de donaciones |

### Cargos Directivos

El sistema permite asignar cargos organizacionales: Presidente/a, Vicepresidente/a, Secretario/a, Tesorero/a, Director/a de Proyectos, Director/a de Comunicaciones, Coordinador de Voluntarios, Consejero/a.

---

## 🔐 Seguridad

| Característica | Implementación |
|----------------|----------------|
| **Autenticación** | JWT con access tokens (15 min) + refresh tokens (7 días) |
| **Autorización** | RBAC (Role-Based Access Control) con permisos granulares |
| **Multi-tenancy** | Row-level security en PostgreSQL |
| **Encriptación** | AES-256 para datos sensibles, TLS 1.3 |
| **Contraseñas** | Hash con Argon2 |
| **2FA** | TOTP opcional |
| **Rate Limiting** | 10 req/min (auth), 100 req/s (API) |
| **Cumplimiento** | OWASP Top 10, WCAG 2.1 AA |

---

## ⚡ Robustez y Disponibilidad

A diferencia de otras soluciones en el mercado que sufren de inestabilidad, **Impacta+** está construida sobre una arquitectura de alta disponibilidad:

- **Uptime Garantizado:** 99.9% mediante monitoreo activo 24/7 con Prometheus y Grafana.
- **Failover:** Configuración de Nginx y Docker para recuperación automática de contenedores.
- **Backups Críticos:** Respaldos de base de datos cada 6 horas para asegurar que la información social nunca se pierda.
- **Escalabilidad:** Preparada para manejar picos de tráfico durante campañas masivas de recaudación o emergencias.

---

## 💰 Modelo de Negocio

| Plan | Precio | Incluye |
|:----:|:------:|---------|
| **Free** | $0/mes | Hasta 50 socios, 1 evento/mes, donaciones básicas |
| **Básico** | $29/mes | Hasta 200 socios, eventos ilimitados, rifas digitales |
| **Pro** | $79/mes | Socios ilimitados, todos los módulos, landing page |
| **Enterprise** | Personalizado | Multi-ONG, API, soporte prioritario, white-label |

---

## 📈 Roadmap

```
Fase 1 ████████████████████░░░░░░░░░░░░  Core MVP           (5-7 semanas)
Fase 2 ░░░░░░░░░░░░░░░░░░░░████████░░░░  Crecimiento        (4-6 semanas)
Fase 3 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░████  Madurez & IA       (4-5 semanas)
       ─────────────────────────────────
       Total estimado: 3-4 meses
```

### Objetivos de Lanzamiento

| Métrica | Objetivo | Período |
|---------|:--------:|---------|
| ONGs registradas | 50+ | 6 meses |
| Usuarios activos | 1,000+ | 6 meses |
| Tasa de retención | > 80% | Mensual |
| Donaciones procesadas | $50,000+ | 6 meses |
| Tiempo de respuesta | < 2s | Continuo |
| Uptime | 99.9% | Continuo |

---

## 🧪 Testing

| Tipo | Herramienta | Cobertura |
|------|:-----------:|:---------:|
| Unit Tests | Jest | 80% |
| Integration Tests | Jest + Supertest | 70% |
| E2E Tests | Playwright | Flujos críticos |
| Load Tests | k6 | 1,000 usuarios |
| Security Tests | OWASP ZAP | Vulnerabilidades |

```bash
# Ejecutar tests unitarios
pnpm test

# Ejecutar tests con cobertura
pnpm test:coverage

# Ejecutar tests E2E
pnpm test:e2e

# Linting
pnpm lint
```

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [`Impacta+PRD.md`](Impacta+PRD.md) | Documento de Requisitos de Producto (PRD v6.0) |
| [`ARQUITECTURA_TECNICA.md`](ARQUITECTURA_TECNICA.md) | Arquitectura técnica, stack, modelo de datos, API |
| [`ARQUITECTURA_MOVIL_I18N.md`](ARQUITECTURA_MOVIL_I18N.md) | Arquitectura mobile (React Native) e internacionalización |
| [`DISENO_IDENTIDAD_VISUAL.md`](DISENO_IDENTIDAD_VISUAL.md) | Sistema de diseño, paleta de colores, tipografía, componentes |

---

## 📂 Estructura del Repositorio

```
ONG_impacta/
├── 📄 README.md                          # Este archivo
├── 📄 LICENSE                            # Licencia MIT
├── 📄 .gitignore                         # Archivos ignorados por Git
├── 📄 Impacta+PRD.md                     # Documento de Requisitos de Producto
├── 📄 ARQUITECTURA_TECNICA.md            # Arquitectura técnica completa
├── 📄 ARQUITECTURA_MOVIL_I18N.md         # Arquitectura móvil e i18n
├── 📄 DISENO_IDENTIDAD_VISUAL.md         # Diseño e identidad visual
├── 📁 docs/                              # Documentos de actividades de la ONG
├── 📁 img/                               # Recursos visuales (logos, fotos, banners)
└── 📁 .github/                           # Workflows de CI/CD (próximamente)
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el repositorio
2. Crea una **branch** para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. **Push** a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Documentación |
| `style:` | Estilos (sin cambios de lógica) |
| `refactor:` | Refactorización |
| `test:` | Tests |
| `chore:` | Tareas de mantenimiento |

### Code Quality

- **ESLint** + **Prettier** para estilo de código
- **TypeScript** estricto (no `any` implícitos)
- **Cyclomatic complexity** < 10
- Pull requests requieren review antes de merge

---

## ⚖️ Cumplimiento Legal (Chile)

| Normativa | Aplicación |
|-----------|------------|
| **Ley 19.628** | Protección de la Vida Privada y datos personales |
| **Ley 19.885** | Donaciones con fines sociales (certificados) |
| **Ley 19.799** | Documentos y firma electrónica |
| **Normativa SII** | Exportación F29, F39, boletas electrónicas |
| **Ministerio de Justicia** | Rendición de cuentas para ONGs |

---

## 📄 Licencia

Este proyecto está bajo la licencia **Apache License 2.0**. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

---

## 📞 Contacto

<p align="center">
  <strong>ONG Impacta+</strong><br>
  <em>Restaurando Nuestro Planeta</em><br><br>
  🌐 <a href="https://impacta.pinguinoseguro.cl">impacta.pinguinoseguro.cl</a>
</p>

---

<p align="center">
  Hecho con 💚 para las ONGs que hacen del mundo un lugar mejor
</p>
