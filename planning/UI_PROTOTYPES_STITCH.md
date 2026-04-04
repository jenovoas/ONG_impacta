# Prototipos Stitch — Referencia y Gestión
## Proyecto: `4741044715461206908` — "Interfaz Diseño Proyecto"

> Sistema de diseño: "The Digital Steward" · Modo oscuro · `#00A8FF` primario · `#00D4AA` acento
> Última sincronización: 2026-04-04

---

## ⚠️ INSTRUCCIONES CRÍTICAS PARA CUALQUIER AGENTE O DESARROLLADOR

1. **`/proto` es de solo lectura.** Nunca escribir, modificar ni generar código en esa carpeta.
2. **No copiar HTML de `/proto` en componentes React.** Son referencia visual, no código fuente.
3. **Antes de implementar cualquier pantalla**: abrir el `.html` correspondiente en el navegador y recrear en React usando shadcn/ui + Tailwind + los design tokens de `FASE1/03_DESIGN_TOKENS.md`.
4. **Si no existe prototipo para un módulo**: crear primero en Stitch (proyecto `4741044715461206908`), exportar HTML a `/proto`, actualizar este archivo, y LUEGO implementar.
5. **Cambios de diseño**: modificar el prototipo en Stitch primero → exportar → actualizar `/proto` → implementar. Nunca al revés. (ITIL Change Management)

---

## Estado de cobertura

| Estado | Módulo | Archivo en /proto |
|--------|--------|-------------------|
| ✅ | Dashboard General | `dashboard-general.html` / `dashboard-general-es.html` |
| ✅ | Gestión de Socios | `socios.html` / `socios-es.html` |
| ✅ | Calendario y Tareas | `calendario-tareas.html` / `calendario-tareas-es.html` |
| ✅ | Donaciones y Pagos | `donaciones-transparencia.html` / `donaciones-transparencia-es.html` |
| ✅ | Biblioteca de Especies | `biblioteca-especies.html` / `biblioteca-especies-pro.html` / `biblioteca-especies-es.html` |
| ✅ | Landing Page | `landing-new-identity-2026.html` (canónica) + 3 variantes |
| ❌ | Auth UI | **Pendiente crear en Stitch** |
| ❌ | App Shell (Sidebar/Topbar) | **Pendiente crear en Stitch** |
| ❌ | Eventos | **Pendiente crear en Stitch** |
| ❌ | Rifas Digitales | **Pendiente crear en Stitch** |
| ❌ | Ayuda Social | **Pendiente crear en Stitch** |
| ❌ | Rescate Ecológico | **Pendiente crear en Stitch** |
| ❌ | Contabilidad | **Pendiente crear en Stitch** |
| ❌ | Reportes | **Pendiente crear en Stitch** |
| ❌ | Super Admin | **Pendiente crear en Stitch** |
| ❌ | Portal del Socio | **Pendiente crear en Stitch** |

---

## Pantallas existentes — mapping completo

### Dashboard General
| Planning ID | Archivo /proto | Stitch Screen ID | Usar como referencia para |
|-------------|---------------|-----------------|--------------------------|
| D01 | `dashboard-general.html` | `bb3ed77719164e9eb20032f76a68a83d` | `/dashboard` — layout principal, KPIs, widgets |
| D01 (ES) | `dashboard-general-es.html` | `a7364b8ba35040f0902f1a927d9df219` | variante en español, misma estructura |

> Referencia primaria: `dashboard-general.html`

---

### Landing Page (apps/landing — Next.js)
| Planning ID | Archivo /proto | Stitch Screen ID | Notas |
|-------------|---------------|-----------------|-------|
| L01 | `landing-new-identity-2026.html` | `8ab8ba03f873471499d8fe9065a1f044` | **Canónica — usar esta** |
| L01 v2 | `landing-portal-publico.html` | `bbda99dc244842eb9e2e2f4df876790b` | variante portal ONG |
| L01 v3 | `landing-edicion-planeta-es.html` | `271d7ccd1e2a4a2ebf39281c912a059b` | variante edición planeta |
| L01 v4 | `landing-cinematic-earth.html` | `bf9bacc89f0140d2967a7050c52e9402` | variante cinematic |

> Referencia primaria: `landing-new-identity-2026.html`

---

### M01 — Socios y Voluntarios (Sprint 2)
| Planning ID | Archivo /proto | Stitch Screen ID | Cubre pantallas |
|-------------|---------------|-----------------|----------------|
| M01–M03 | `socios.html` | `a3aee71595ee49ea9b4aba1b7180e57e` | Lista socios, detalle, formulario |
| M01–M03 (ES) | `socios-es.html` | `80130638e30545a2a742ba65e041360e` | variante español |

> Referencia primaria: `socios.html`
> Pantallas del planning cubiertas: M01 (lista), M02 (detalle), M03 (formulario nuevo/editar)
> Pendiente de prototipo: M04 (lista voluntarios), M05 (detalle voluntario), M06 (nuevo voluntario), M07 (organigrama)

---

### M02 — Calendario y Tareas (Sprint 2)
| Planning ID | Archivo /proto | Stitch Screen ID | Cubre pantallas |
|-------------|---------------|-----------------|----------------|
| C01–C04 | `calendario-tareas.html` | `a12f286269a34bb8acd263dab827db5d` | Calendario, lista tareas, Kanban |
| C01–C04 (ES) | `calendario-tareas-es.html` | `6aac4ee60f1e4c7e99f7289fe8883e7a` | variante español |

> Referencia primaria: `calendario-tareas.html`

---

### M03 — Donaciones y Pagos (Sprint 3)
| Planning ID | Archivo /proto | Stitch Screen ID | Cubre pantallas |
|-------------|---------------|-----------------|----------------|
| P01–P07 | `donaciones-transparencia.html` | `dfd4a5570dfd48a28b267e0c7d27f923` | Dashboard donaciones, transacciones, campañas |
| P01–P07 (ES) | `donaciones-transparencia-es.html` | `a4a31f76e9b14196b6f02c074ca2e19e` | variante español |

> Referencia primaria: `donaciones-transparencia.html`

---

### M06b — Biblioteca de Especies (Sprint 5)
| Planning ID | Archivo /proto | Stitch Screen ID | Cubre pantallas |
|-------------|---------------|-----------------|----------------|
| BE01–BE06 | `biblioteca-especies.html` | `057d5242c6514dc89d4657af4444684c` | Catálogo, detalle especie |
| BE01–BE06 Pro | `biblioteca-especies-pro.html` | `b406b288dd1145bc842f87fd7cb9cbcb` | Versión Pro con features avanzados |
| BE01–BE06 (ES) | `biblioteca-especies-es.html` | `45135d9dfdf84649b2da4c0b333c86e2` | variante español |

> Referencia primaria: `biblioteca-especies-pro.html` (versión más completa)

---

## Prototipos pendientes — instrucciones para crearlos en Stitch

Antes de iniciar cada sprint, crear los prototipos faltantes en el proyecto Stitch `4741044715461206908`.
Seguir el sistema de diseño "The Digital Steward" ya configurado en el proyecto.

### Sprint 1 — Auth UI + App Shell
Crear en Stitch y exportar a `/proto`:

**`auth-login.html`** — Pantalla `/auth/login`
- Campo email + contraseña
- Link "Olvidé mi contraseña" y "Registrar ONG"
- Botón login con gradiente primario
- Logo Impacta+ centrado arriba
- Fondo: `#131313`, card glassmorphism centrado

**`auth-2fa.html`** — Pantalla `/auth/2fa`
- Input de 6 dígitos (TOTP)
- Link "Usar código de respaldo"

**`app-shell.html`** — Layout base del dashboard
- Sidebar colapsable (240px expandido / 64px colapsado)
- Iconos Lucide stroke 1.5px
- Topbar: logo ONG izquierda, búsqueda global centro, notificaciones + avatar derecha
- Secciones sidebar: Dashboard, Socios, Calendario, Donaciones, Eventos, Ecología, Especies, Contabilidad, Reportes, Configuración

---

### Sprint 4 — Eventos y Rifas
Crear en Stitch y exportar a `/proto`:

**`eventos.html`** — Pantallas `/eventos` y `/eventos/:id`
- Grid de tarjetas de eventos con imagen, fecha, inscriptos, termómetro
- Detalle con tabs: Info | Inscriptos | Check-in | Recaudación
- Vista check-in con QR scanner area + lista manual

**`rifas.html`** — Pantallas `/rifas` y `/rifas/:id/sorteo`
- Lista de rifas con progreso de boletos vendidos
- Pantalla de sorteo con animación (componente destacado)

---

### Sprint 5 — Ayuda Social y Ecología
Crear en Stitch y exportar a `/proto`:

**`ayuda-social.html`** — Pantallas `/ayuda-social` y `/ayuda-social/:id`
- DataTable de beneficiarios + mapa Leaflet lateral
- Detalle con historial de entregas, firma digital, fotos

**`ecologia.html`** — Pantallas `/ecologia` y `/ecologia/:id`
- Lista de proyectos con KPIs: árboles, área (hectáreas), voluntarios
- Detalle con galería, actividades, métricas acumuladas con gráficos

---

### Sprint 6 — Contabilidad
Crear en Stitch y exportar a `/proto`:

**`contabilidad.html`** — Pantallas `/contabilidad`, `/contabilidad/diario`, `/contabilidad/balance`
- Dashboard: resumen por tipo de cuenta, alertas de presupuesto
- Libro diario: tabla de asientos con filtros
- Formulario de asiento con validación partida doble en tiempo real
- Balance: tabla de comprobación + estado de resultados

---

### Sprint 7 — Reportes y Super Admin
Crear en Stitch y exportar a `/proto`:

**`reportes.html`** — Pantallas `/reportes/*`
- Centro de reportes con cards de reportes disponibles
- Reporte financiero con gráficos de series temporales + botón exportar PDF/CSV

**`super-admin.html`** — Panel `apps/admin`
- Dashboard global: ONGs activas, usuarios totales, transacciones del mes
- DataTable de ONGs con plan, estado, fecha de alta

---

## Flujo de trabajo obligatorio (ITIL Change Management)

```
1. Diseñar en Stitch → 2. Exportar HTML → 3. Guardar en /proto → 4. Actualizar este archivo → 5. Implementar en React
```

**Nunca saltarse pasos. Nunca implementar sin prototipo aprobado.**

---

## Assets de identidad visual

| Asset | Archivo | Stitch ID | Uso |
|-------|---------|-----------|-----|
| Logo principal | (imagen en Stitch) | `ad9a588c01ed426390b4968d9be33019` | Topbar, landing, emails |
| Favicon / Icono | (imagen en Stitch) | `04cead8689d441388f00bf8c293324dc` | `<head>` de todas las apps |

---

## Reglas de diseño aplicadas en todos los prototipos (ISO 25010 + SOLID)

- **SRP**: cada prototipo representa una única pantalla o flujo funcional
- **Sin bordes 1px sólidos**: separación solo por cambio de fondo (surface hierarchy)
- **Glassmorphism** en modales y hero sections: `backdrop-blur: 20px`
- **Tipografía**: Manrope para títulos, Inter para cuerpo
- **Sombras**: `0px 24px 48px rgba(0,0,0,0.4)` — nunca sombras grises planas
- **Accesibilidad (ISO 25010)**: contraste mínimo 4.5:1, foco visible en todos los inputs
- **Iconos Lucide**: stroke `1.5px` (nunca peso por defecto)
