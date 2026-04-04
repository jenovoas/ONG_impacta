# Documento de Requisitos de Producto (PRD)

## ONG Impacta+ SaaS — Plataforma de Gestión para ONGs

| **Versión** | 2.0 |
|-------------|-----|
| **Estado** | En revisión |
| **Fecha** | 4 de abril de 2026 |
| **Responsable** | Equipo de Desarrollo |

---

## 1. Resumen Ejecutivo

### 1.1 Propósito

Desarrollar una plataforma SaaS multi-tenant para la gestión integral de Organizaciones No Gubernamentales (ONGs), permitiendo administrar eventos, donaciones, ayuda social, rescate ecológico, rifas digitales, recaudación de fondos, y administración de socios, clientes y proveedores.

### 1.2 Problema a Resolver

Las ONGs carecen de sistemas internos de administración que les permitan gestionar de manera eficiente sus operaciones diarias, incluyendo:

- Gestión de socios, voluntarios y beneficiarios
- Administración de eventos y recaudación de fondos
- Control de donaciones y transparencia financiera
- Organización de actividades de ayuda social y ecológica
- Digitalización de rifas y otras actividades de fundraising
- **Registro y estudio de especies nativas, flora y fauna**
- **Seguimiento de poblaciones y evaluación de impacto ambiental**

### 1.3 Visión del Producto

Convertirse en la plataforma líder para la gestión de ONGs en la región, ofreciendo una solución todo-en-uno que permita a las organizaciones enfocarse en su misión social en lugar de en tareas administrativas.

### 1.4 Modelo de Negocio

- **SaaS Multi-tenant**: Múltiples ONGs comparten la misma infraestructura
- **Plan Freemium**: Funcionalidades básicas gratuitas
- **Planes Premium**: Funcionalidades avanzadas por suscripción mensual/anual
- **Comisión por transacción**: Porcentaje en donaciones y rifas digitales

---

## 2. Objetivos del Producto

### 2.1 Objetivo Principal

Crear una plataforma SaaS que centralice y automatice la gestión operativa de ONGs, mejorando su eficiencia y transparencia.

### 2.2 Objetivos Específicos

| ID | Objetivo | Prioridad |
|----|----------|-----------|
| OE1 | Proveer administración completa de socios y voluntarios | Alta (MVP) |
| OE2 | Facilitar la gestión de eventos y recaudación de fondos | Alta |
| OE3 | Habilitar sistema de donaciones con transparencia | Alta |
| OE4 | Digitalizar rifas y actividades de fundraising | Media |
| OE5 | Gestionar ayuda social y programas de rescate ecológico | Media |
| OE6 | Administrar proveedores y compras | Media |
| OE7 | Generar reportes automáticos para transparencia | Alta |
| OE8 | Proveer landing page personalizada por ONG | Media |
| OE9 | Crear biblioteca técnica de especies nativas (flora y fauna) | Alta |
| OE10 | Implementar sistema de seguimiento de poblaciones y evaluación de impacto ambiental | Alta |

---

## 3. Módulos del Sistema

### 3.1 Módulo de Administración de Socios y Voluntarios (MVP)

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Registro de Socios** | Alta de nuevos socios con datos completos | Alta |
| **Gestión de Membresías** | Control de cuotas, vencimientos y estados | Alta |
| **Perfil de Voluntarios** | Registro con habilidades, disponibilidad y áreas de interés | Alta |
| **Asignación de Tareas** | Distribución de voluntarios por actividades/proyectos | Alta |
| **Historial de Participación** | Tracking de actividades realizadas por cada voluntario | Media |
| **Comunicación Interna** | Notificaciones por email/SMS a socios y voluntarios | Media |
| **Certificados de Voluntariado** | Generación automática de certificados | Baja |
| **Ranking de Voluntarios** | Reconocimiento a voluntarios destacados | Baja |

### 3.2 Módulo de Eventos y Recaudación de Fondos

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Creación de Eventos** | Configuración de eventos (nombre, fecha, lugar, capacidad) | Alta |
| **Calendario Público** | Visualización de eventos próximos | Alta |
| **Inscripciones en Línea** | Registro de participantes con pago integrado | Alta |
| **Gestión de Asistencia** | Check-in el día del evento | Media |
| **Eventos de Recaudación** | Configuración de metas de fundraising | Alta |
| **Termómetro de Donaciones** | Visualización del progreso de la meta | Alta |
| **Tickets Digitales** | Generación y envío de tickets/e-tickets | Media |
| **Recordatorios Automáticos** | Notificaciones previas al evento | Media |

### 3.3 Módulo de Donaciones

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Donaciones en Línea** | Integración con pasarelas de pago (MercadoPago, PayPal, Stripe) | Alta |
| **Donaciones Recurrentes** | Suscripciones mensuales/anuales | Alta |
| **Donaciones en Especie** | Registro de donaciones no monetarias | Media |
| **Certificados de Donación** | Generación de certificados para deducción de impuestos | Alta |
| **Transparencia** | Tracking de uso de fondos por proyecto | Alta |
| **Muro de Donantes** | Reconocimiento público (opcional) | Media |
| **Campanas de Donación** | Campañas específicas con metas y plazos | Alta |

### 3.4 Módulo de Rifas Digitales

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Creación de Rifas** | Configuración de premios, cantidad de boletos, precio | Alta |
| **Venta de Boletos en Línea** | Selección de números y pago integrado | Alta |
| **Boleto Digital** | Envío de boleto por email/WhatsApp | Alta |
| **Sorteo Automatizado** | Selección aleatoria con acta digital | Alta |
| **Notificación a Ganadores** | Comunicación automática a ganadores | Alta |
| **Historial de Rifas** | Archivo de rifas realizadas y resultados | Media |
| **Límite por Persona** | Configuración de máximo de boletos por persona | Media |

### 3.5 Módulo de Ayuda Social

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Registro de Beneficiarios** | Base de datos de personas/familias beneficiadas | Alta |
| **Seguimiento de Casos** | Historial de ayuda proporcionada | Alta |
| **Tipos de Ayuda** | Clasificación (alimentos, salud, educación, vivienda, etc.) | Alta |
| **Entrega de Ayuda** | Registro de entregas con firma/foto digital | Alta |
| **Reportes de Impacto** | Estadísticas de ayuda entregada | Alta |
| **Geolocalización** | Mapa de zonas beneficiadas | Media |

### 3.6 Módulo de Rescate Ecológico

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Registro de Proyectos** | Proyectos de reforestación, limpieza, conservación | Alta |
| **Seguimiento de Actividades** | Tracking de jornadas y voluntarios participantes | Alta |
| **Métricas de Impacto** | Árboles plantados, residuos recolectados, etc. | Alta |
| **Galería de Proyectos** | Fotos antes/después | Media |
| **Certificados de Participación** | Para voluntarios en actividades ecológicas | Baja |

### 3.7 Módulo de Biblioteca Técnica de Especies Nativas e Impacto Ambiental

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Catálogo de Flora Nativa** | Base de datos de árboles, plantas y vegetación autóctona con fichas técnicas | Alta |
| **Catálogo de Fauna Nativa** | Registro de especies animales, hábitat y estado de conservación | Alta |
| **Fichas Técnicas de Especies** | Información científica: nombre científico, familia, características, distribución | Alta |
| **Galería de Especies** | Fotografías, videos y material audiovisual de cada especie | Alta |
| **Registro de Avistamientos** | Geolocalización de avistamientos con fecha, hora y condiciones | Alta |
| **Seguimiento de Poblaciones** | Evolución temporal de poblaciones de especies clave | Alta |
| **Alertas de Especies Amenazadas** | Notificaciones sobre especies en peligro o disminución crítica | Alta |
| **Evaluación de Impacto Ambiental** | Herramientas para estudiar y medir impacto de actividades/proyectos | Alta |
| **Reportes de Biodiversidad** | Informes de riqueza de especies por zona/proyecto | Media |
| **Mapas de Distribución** | Visualización geográfica de distribución de especies | Media |
| **Comparativas Históricas** | Análisis de cambios en poblaciones a lo largo del tiempo | Media |
| **Integración con Ciencia Ciudadana** | Posibilidad de que voluntarios registren avistamientos | Baja |
| **Exportación de Datos Científicos** | Formatos compatibles con sistemas de investigación (CSV, Darwin Core) | Media |

### 3.8 Módulo de Administración (CRM)

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Gestión de Socios/Clientes** | CRM completo con historial de interacciones | Alta |
| **Gestión de Proveedores** | Base de datos de proveedores y contratos | Alta |
| **Órdenes de Compra** | Generación y seguimiento de compras | Media |
| **Cuentas por Pagar** | Control de pagos a proveedores | Media |
| **Contactos** | Agenda centralizada de contactos | Media |

### 3.9 Módulo de Reportes y Analytics

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Dashboard General** | Vista general de métricas clave | Alta |
| **Reportes Financieros** | Ingresos, egresos, balance por proyecto | Alta |
| **Reportes de Impacto** | Beneficiarios, voluntarios, actividades | Alta |
| **Exportación de Datos** | Excel, PDF, CSV | Alta |
| **Reportes Personalizados** | Configuración de reportes a medida | Media |

### 3.10 Módulo de Landing Page

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Landing Page Personalizada** | Página web automática para cada ONG | Media |
| **Personalización de Marca** | Logo, colores, dominio personalizado | Media |
| **Formularios Públicos** | Contacto, voluntariado, donaciones | Alta |
| **Blog/Noticias** | Publicación de noticias y actualizaciones | Media |
| **Integración Redes Sociales** | Enlaces y feeds de redes sociales | Media |

---

## 4. Arquitectura Técnica

### 4.1 Arquitectura Multi-tenant

```
┌─────────────────────────────────────────────────────────┐
│                    LOAD BALANCER                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   API GATEWAY                           │
│              (Autenticación, Rate Limiting)             │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│   Servicio    │ │   Servicio    │ │   Servicio    │
│   de ONGs     │ │   de Socios   │ │   Eventos     │
└───────────────┘ └───────────────┘ └───────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    BASE DE DATOS                        │
│         (PostgreSQL con row-level security)             │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Stack Tecnológico Propuesto

| Capa | Tecnología | Justificación |
|------|------------|---------------|
| **Frontend** | React + TypeScript + TailwindCSS | Moderno, escalable, buena UX |
| **Backend** | Node.js + NestJS | TypeScript full-stack, arquitectura modular |
| **Base de Datos** | PostgreSQL | Robusto, open-source, row-level security |
| **Cache** | Redis | Sesiones, cache de consultas frecuentes |
| **Colas** | Bull/Redis | Tareas asíncronas (emails, reportes) |
| **Almacenamiento** | AWS S3 / Cloudflare R2 | Fotos, documentos, archivos |
| **Hosting** | Vercel (Frontend) + Railway/Render (Backend) | Fácil deploy, escalable |
| **Pagos** | MercadoPago + PayPal + Stripe | Cobertura regional e internacional |

### 4.3 Seguridad

| Requisito | Implementación |
|-----------|----------------|
| Autenticación | JWT con refresh tokens |
| Autorización | RBAC (Roles y Permisos) |
| Multi-tenancy | Row-level security en BD |
| Encriptación | TLS 1.3, datos sensibles encriptados |
| Backups | Automáticos diarios |

---

## 5. Roles de Usuario

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Super Admin** | Administrador de la plataforma SaaS | Acceso total a todas las ONGs |
| **Admin ONG** | Administrador de una ONG específica | Acceso completo a su ONG |
| **Coordinador** | Coordinador de área/voluntarios | Gestión de voluntarios y eventos |
| **Voluntario** | Voluntario registrado | Ver eventos, actualizar perfil |
| **Socio** | Socio con membresía activa | Ver beneficios, pagar cuotas |
| **Donante** | Donante registrado | Ver historial de donaciones |

---

## 6. Requisitos No Funcionales

| ID | Requisito | Descripción |
|----|-----------|-------------|
| RNF1 | **Disponibilidad** | 99.9% uptime garantizado |
| RNF2 | **Performance** | < 2 segundos de respuesta en 95% de requests |
| RNF3 | **Escalabilidad** | Soportar 100+ ONGs, 10,000+ usuarios concurrentes |
| RNF4 | **Seguridad** | Cumplimiento OWASP Top 10 |
| RNF5 | **Backup** | Backups automáticos diarios con retención de 30 días |
| RNF6 | **Responsive** | Funcional en móvil, tablet y desktop |
| RNF7 | **Accesibilidad** | WCAG 2.1 nivel AA |
| RNF8 | **Multi-idioma** | Español e inglés (futuro) |

---

## 7. Criterios de Aceptación

### 7.1 MVP (Módulo Socios y Voluntarios)

- [ ] Registro y alta de nuevos socios con validación de datos
- [ ] Gestión de membresías (alta, baja, renovación)
- [ ] Perfil completo de voluntarios con habilidades y disponibilidad
- [ ] Búsqueda y filtrado de socios/voluntarios
- [ ] Exportación de listados a Excel/PDF
- [ ] Notificaciones por email (bienvenida, vencimiento de membresía)
- [ ] Dashboard con métricas de socios y voluntarios

### 7.2 Criterios Generales

- [ ] La plataforma soporta al menos 10 ONGs simultáneas en testing
- [ ] Los datos de cada ONG están aislados y no son accesibles por otras ONGs
- [ ] El tiempo de carga inicial es menor a 3 segundos
- [ ] La plataforma funciona en Chrome, Firefox, Safari y Edge (últimas 2 versiones)

---

## 8. Métricas de Éxito

| Métrica | Objetivo | Período |
|---------|----------|---------|
| ONGs registradas | 50+ | Primeros 6 meses |
| Usuarios activos | 1,000+ | Primeros 6 meses |
| Tasa de retención | > 80% | Mensual |
| Donaciones procesadas | $50,000+ | Primeros 6 meses |
| NPS (Net Promoter Score) | > 50 | Trimestral |
| Tiempo de respuesta | < 2 segundos | Continuo |

---

## 9. Cronograma Tentativo

### Fase 1: MVP (8-10 semanas)

| Semana | Entregables |
|--------|-------------|
| 1-2 | Diseño UI/UX, Arquitectura, Setup del proyecto |
| 3-5 | Módulo de Socios y Voluntarios (core) |
| 6-7 | Autenticación, RBAC, Multi-tenancy |
| 8-9 | Dashboard y Reportes básicos |
| 10 | Testing, QA, Deploy a producción |

### Fase 2: Módulos de Recaudación (6-8 semanas)

| Semana | Entregables |
|--------|-------------|
| 1-2 | Módulo de Eventos |
| 3-4 | Módulo de Donaciones |
| 5-6 | Módulo de Rifas Digitales |
| 7-8 | Testing, QA, Deploy |

### Fase 3: Módulos Operativos (8-10 semanas)

| Semana | Entregables |
|--------|-------------|
| 1-2 | Módulo de Ayuda Social |
| 3-4 | Módulo de Rescate Ecológico |
| 5-7 | Biblioteca Técnica de Especies Nativas e Impacto Ambiental |
| 8-9 | CRM (Proveedores, Compras) |
| 10 | Testing, QA, Deploy |

### Fase 4: Landing Pages y Analytics (4-6 semanas)

| Semana | Entregables |
|--------|-------------|
| 1-2 | Generador de Landing Pages |
| 3-4 | Módulo de Analytics avanzado |
| 5-6 | Testing, QA, Deploy |

**Total estimado:** 26-34 semanas (7-9 meses)

---

## 10. Riesgos y Dependencias

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Complejidad de desarrollo | Alta | Alto | Priorizar MVP, iteraciones cortas |
| Adopción lenta del mercado | Media | Alto | Plan de marketing, beta testers |
| Problemas con pasarelas de pago | Media | Alto | Múltiples proveedores, fallback |
| Escalabilidad insuficiente | Baja | Alto | Arquitectura cloud-native desde inicio |
| Cambios regulatorios | Media | Medio | Asesoría legal, cumplimiento local |
| Competencia | Media | Medio | Diferenciación por precio y funcionalidades |

---

## 11. Plan de Monetización

| Plan | Precio | Funcionalidades |
|------|--------|-----------------|
| **Free** | $0/mes | Hasta 50 socios, 1 evento/mes, donaciones básicas |
| **Básico** | $29/mes | Hasta 200 socios, eventos ilimitados, rifas digitales |
| **Pro** | $79/mes | Socios ilimitados, todos los módulos, landing page |
| **Enterprise** | Personalizado | Multi-ONG, API, soporte prioritario, white-label |

**Comisiones:**

- Donaciones: 2.9% + $0.30 por transacción
- Rifas digitales: 5% del recaudado

---

## 12. Glosario

| Término | Definición |
|---------|------------|
| **Multi-tenant** | Arquitectura donde una instancia sirve a múltiples clientes |
| **SaaS** | Software as a Service, software por suscripción en la nube |
| **RBAC** | Role-Based Access Control, control de acceso por roles |
| **Fundraising** | Recaudación de fondos |
| **Row-level security** | Seguridad a nivel de fila en base de datos |
| **MVP** | Minimum Viable Product, producto mínimo viable |
| **EIA** | Evaluación de Impacto Ambiental |
| **Darwin Core** | Estándar internacional para intercambio de datos de biodiversidad |

---

## 13. Aprobaciones

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| Product Owner | | | |
| Stakeholder | | | |
| Tech Lead | | | |

---

*Documento elaborado para el proyecto SaaS de gestión de ONGs*
