# Mapa de Pantallas — Impacta+ Frontend
## Fase 1 MVP

> Stack: React 18 + Vite + TailwindCSS + shadcn/ui + Lucide Icons
> Tema: Oscuro por defecto | Fuentes: Inter (UI) + Montserrat (títulos)
> Colores: `#00A8FF` primario · `#00D4AA` acento · `#000000` fondo · `#FFFFFF` texto

---

## 1. Aplicación: Landing Page (Next.js)

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| L01 | Home | `/` | Hero, propuesta de valor, módulos, testimonios, CTA |
| L02 | Planes | `/planes` | Tabla comparativa de planes + CTA |
| L03 | Sobre Nosotros | `/sobre` | Historia, equipo, misión |
| L04 | Contacto | `/contacto` | Formulario de contacto |
| L05 | Registro ONG | `/registro` | Formulario de alta de nueva ONG |
| L06 | Transparencia Pública | `/ong/[slug]/transparencia` | Dashboard público de métricas de la ONG |

---

## 2. Aplicación: Auth (Compartida)

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| A01 | Login | `/auth/login` | Email + contraseña, link a registro/recuperar |
| A02 | Recuperar contraseña | `/auth/recuperar` | Envío de email de recuperación |
| A03 | Nueva contraseña | `/auth/nueva-contrasena` | Formulario con token |
| A04 | 2FA | `/auth/2fa` | Ingreso de código TOTP |

---

## 3. Aplicación: Dashboard Web (React + Vite)

### 3.1 Shell / Layout

| ID | Componente | Descripción |
|----|-----------|-------------|
| S01 | Sidebar | Navegación lateral colapsable con íconos + labels |
| S02 | Topbar | Logo ONG, búsqueda global, notificaciones, perfil |
| S03 | Breadcrumb | Navegación contextual |
| S04 | Footer interno | Versión, links de ayuda |

### 3.2 Dashboard General

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| D01 | Dashboard Home | `/dashboard` | KPIs generales, actividad reciente, accesos rápidos |

**Widgets del Dashboard:**
- Total socios activos
- Donaciones del mes
- Próximos eventos (3)
- Tareas pendientes asignadas al usuario
- Termómetro de recaudación activo
- Alertas de sistema

### 3.3 Módulo: Socios y Voluntarios

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| M01 | Lista de socios | `/socios` | Tabla paginada con filtros y búsqueda |
| M02 | Detalle socio | `/socios/[id]` | Perfil completo, historial, membresía |
| M03 | Nuevo / Editar socio | `/socios/nuevo` `/socios/[id]/editar` | Formulario multi-step |
| M04 | Lista de voluntarios | `/voluntarios` | Tabla con habilidades y disponibilidad |
| M05 | Detalle voluntario | `/voluntarios/[id]` | Perfil, tareas asignadas, historial |
| M06 | Nuevo / Editar voluntario | `/voluntarios/nuevo` | Formulario |
| M07 | Organigrama | `/organigrama` | Visualización árbol de cargos y roles |

### 3.4 Módulo: Calendario y Tareas

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| C01 | Calendario | `/calendario` | Vista mensual/semanal/diaria con FullCalendar |
| C02 | Lista de tareas | `/tareas` | Kanban o lista con filtros por responsable |
| C03 | Detalle tarea | `/tareas/[id]` | Tarea, comentarios, archivos, estado |
| C04 | Nueva / Editar tarea | `/tareas/nueva` | Formulario con asignación |

### 3.5 Módulo: Donaciones y Pagos

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| P01 | Dashboard donaciones | `/donaciones` | Resumen, gráficos, últimas transacciones |
| P02 | Lista transacciones | `/donaciones/transacciones` | Tabla filtrable completa |
| P03 | Detalle transacción | `/donaciones/[id]` | Comprobante, datos del donante |
| P04 | Nueva donación manual | `/donaciones/nueva` | Registro de pago presencial/transferencia |
| P05 | Cuotas de socios | `/socios/cuotas` | Estado de cuotas por socio, pagos pendientes |
| P06 | Campañas de donación | `/donaciones/campanas` | Lista de campañas activas |
| P07 | Nueva campaña | `/donaciones/campanas/nueva` | Formulario con meta y plazo |

### 3.6 Módulo: Eventos

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| E01 | Lista de eventos | `/eventos` | Tarjetas de eventos activos/pasados |
| E02 | Detalle evento | `/eventos/[id]` | Info, inscriptos, termómetro, check-in |
| E03 | Nuevo / Editar evento | `/eventos/nuevo` | Formulario con configuración de recaudación |
| E04 | Check-in evento | `/eventos/[id]/checkin` | Vista QR + lista de asistentes |

### 3.7 Módulo: Rifas Digitales

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| R01 | Lista de rifas | `/rifas` | Rifas activas e historial |
| R02 | Detalle rifa | `/rifas/[id]` | Boletos vendidos, progreso, sorteo |
| R03 | Nueva rifa | `/rifas/nueva` | Configuración de premios, boletos, precio |
| R04 | Sorteo | `/rifas/[id]/sorteo` | Animación de sorteo + acta digital |

### 3.8 Módulo: Ayuda Social

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| AS01 | Lista beneficiarios | `/ayuda-social` | Base de datos de familias/personas |
| AS02 | Detalle beneficiario | `/ayuda-social/[id]` | Historial de ayuda, seguimiento de caso |
| AS03 | Nuevo beneficiario | `/ayuda-social/nuevo` | Formulario de registro |
| AS04 | Registrar entrega | `/ayuda-social/[id]/entrega` | Tipo, cantidad, firma/foto digital |
| AS05 | Mapa de beneficiarios | `/ayuda-social/mapa` | Geolocalización de zonas atendidas |

### 3.9 Módulo: Rescate Ecológico

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| EC01 | Lista proyectos | `/ecologia` | Proyectos activos con métricas |
| EC02 | Detalle proyecto | `/ecologia/[id]` | Actividades, voluntarios, galería, métricas |
| EC03 | Nuevo proyecto | `/ecologia/nuevo` | Formulario |
| EC04 | Registrar jornada | `/ecologia/[id]/jornada` | Actividad, participantes, métricas (árboles, etc.) |

### 3.10 Módulo: Biblioteca de Especies

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| BE01 | Catálogo general | `/especies` | Grid/lista de flora y fauna con filtros |
| BE02 | Detalle especie | `/especies/[id]` | Ficha técnica, galería, distribución, avistamientos |
| BE03 | Nueva especie | `/especies/nueva` | Formulario con datos científicos |
| BE04 | Registrar avistamiento | `/especies/avistamientos/nuevo` | Geolocalización, fotos, condiciones |
| BE05 | Mapa de avistamientos | `/especies/mapa` | Mapa interactivo con puntos |
| BE06 | Seguimiento poblaciones | `/especies/poblaciones` | Gráficos de evolución temporal |

### 3.11 Módulo: Contabilidad

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| CT01 | Dashboard contable | `/contabilidad` | Resumen financiero, alertas presupuesto |
| CT02 | Plan de cuentas | `/contabilidad/cuentas` | Árbol de cuentas editable |
| CT03 | Libro diario | `/contabilidad/diario` | Asientos cronológicos con filtros |
| CT04 | Nuevo asiento | `/contabilidad/diario/nuevo` | Formulario de asiento con partida doble |
| CT05 | Libro mayor | `/contabilidad/mayor` | Mayor por cuenta seleccionable |
| CT06 | Balance | `/contabilidad/balance` | Balance general y estado de resultados |
| CT07 | Flujo de caja | `/contabilidad/flujo-caja` | Proyección y seguimiento |
| CT08 | Presupuesto | `/contabilidad/presupuesto` | Control presupuestario por centro de costo |
| CT09 | Informes SII | `/contabilidad/sii` | Generación F29, F39 |
| CT10 | Cierre contable | `/contabilidad/cierre` | Proceso de cierre mensual/anual |

### 3.12 Módulo: Reportes

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| RP01 | Centro de reportes | `/reportes` | Lista de reportes disponibles |
| RP02 | Reporte financiero | `/reportes/financiero` | Ingresos, egresos, balance por período |
| RP03 | Reporte de impacto | `/reportes/impacto` | Beneficiarios, voluntarios, actividades |
| RP04 | Reporte de socios | `/reportes/socios` | Altas, bajas, morosidad |

### 3.13 Módulo: Configuración ONG

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| CF01 | Perfil ONG | `/configuracion` | Datos de la organización, logo |
| CF02 | Roles y permisos | `/configuracion/roles` | Gestión de roles custom |
| CF03 | Usuarios | `/configuracion/usuarios` | Gestión de usuarios de la ONG |
| CF04 | Pasarelas de pago | `/configuracion/pagos` | Configurar MercadoPago, PayPal, Stripe |
| CF05 | Notificaciones | `/configuracion/notificaciones` | Preferencias de alertas |
| CF06 | Landing Page | `/configuracion/landing` | Personalización de la página pública |
| CF07 | Facturación / Plan | `/configuracion/plan` | Plan actual, facturación, upgrade |

---

## 4. Panel Super-Admin (apps/admin)

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| SA01 | Dashboard | `/` | Métricas globales de la plataforma |
| SA02 | ONGs | `/ongs` | Lista y gestión de todas las organizaciones |
| SA03 | Detalle ONG | `/ongs/[id]` | Info, uso, plan, usuarios |
| SA04 | Facturación | `/facturacion` | Pagos recibidos, planes activos |
| SA05 | Usuarios globales | `/usuarios` | Todos los usuarios de la plataforma |
| SA06 | Logs y Auditoría | `/logs` | Actividad del sistema |

---

## 5. Portal del Socio (self-service)

| ID | Pantalla | Ruta | Descripción |
|----|----------|------|-------------|
| PS01 | Mi perfil | `/portal/perfil` | Datos personales, editar |
| PS02 | Mi membresía | `/portal/membresia` | Estado, cuotas, pagar en línea |
| PS03 | Mis eventos | `/portal/eventos` | Eventos en que participa/inscrito |
| PS04 | Mis donaciones | `/portal/donaciones` | Historial, certificados |
| PS05 | Documentos | `/portal/documentos` | Certificados descargables |

---

## Totales
| App | Pantallas |
|-----|-----------|
| Landing | 6 |
| Auth | 4 |
| Dashboard (admin/coord) | ~50 |
| Super-Admin | 6 |
| Portal Socio | 5 |
| **Total** | **~71** |
