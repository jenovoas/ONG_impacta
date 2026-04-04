# /proto — Prototipos de Referencia Visual

## ⚠️ ESTA CARPETA ES DE SOLO LECTURA

**NO escribir código en esta carpeta. NO modificar estos archivos.**
**NO generar componentes React desde estos HTMLs.**

Esta carpeta contiene exportaciones HTML de los prototipos diseñados en Google Stitch.
Son **referencia visual únicamente** para guiar la implementación en React.

---

## Propósito

Cuando implementes una pantalla, abre el archivo HTML correspondiente en el navegador
para ver el diseño objetivo. Luego recrea esa interfaz usando:

- `React 18` + `Vite` (apps/web)
- `shadcn/ui` + `TailwindCSS`
- `Lucide Icons` (stroke 1.5px)
- Design tokens de `planning/FASE1/03_DESIGN_TOKENS.md`

**El HTML de referencia es un punto de partida visual, no código reutilizable.**

---

## Archivos disponibles

| Archivo | Módulo | Planning ID | Sprint |
|---------|--------|-------------|--------|
| `dashboard-general.html` | Dashboard | D01 | 1 |
| `dashboard-general-es.html` | Dashboard (ES) | D01 | 1 |
| `socios.html` | Gestión de Socios | M01–M03 | 2 |
| `socios-es.html` | Gestión de Socios (ES) | M01–M03 | 2 |
| `calendario-tareas.html` | Calendario y Tareas | C01–C04 | 2 |
| `calendario-tareas-es.html` | Calendario y Tareas (ES) | C01–C04 | 2 |
| `donaciones-transparencia.html` | Donaciones y Pagos | P01–P07 | 3 |
| `donaciones-transparencia-es.html` | Donaciones y Pagos (ES) | P01–P07 | 3 |
| `biblioteca-especies.html` | Biblioteca de Especies | BE01–BE06 | 5 |
| `biblioteca-especies-pro.html` | Biblioteca de Especies Pro | BE01–BE06 | 5 |
| `biblioteca-especies-es.html` | Biblioteca de Especies (ES) | BE01–BE06 | 5 |
| `landing-new-identity-2026.html` | Landing Page (canónica) | L01 | 7 |
| `landing-portal-publico.html` | Landing Page Portal | L01 | 7 |
| `landing-edicion-planeta-es.html` | Landing Page variante | L01 | 7 |
| `landing-cinematic-earth.html` | Landing Page variante | L01 | 7 |

---

## Módulos SIN prototipo — crear antes de implementar

Los siguientes módulos requieren crear el prototipo en Stitch ANTES de iniciar el sprint.
Ver instrucciones completas en `planning/UI_PROTOTYPES_STITCH.md`.

| Módulo | Archivo a crear | Sprint |
|--------|----------------|--------|
| Auth (Login, 2FA, Recuperar) | `auth-login.html`, `auth-2fa.html` | 1 |
| App Shell (Sidebar + Topbar) | `app-shell.html` | 1 |
| Eventos + Rifas | `eventos.html`, `rifas.html` | 4 |
| Ayuda Social | `ayuda-social.html` | 5 |
| Rescate Ecológico | `ecologia.html` | 5 |
| Contabilidad | `contabilidad.html` | 6 |
| Reportes | `reportes.html` | 7 |
| Super Admin | `super-admin.html` | 7 |

---

## Estándares de diseño aplicados

Todos los prototipos siguen:
- **SOLID** — cada pantalla representa una única responsabilidad funcional
- **ISO 25010** — usabilidad, accesibilidad y consistencia visual
- **ITIL** — cambios de diseño requieren actualizar el prototipo en Stitch antes de modificar el código
- **Sistema "The Digital Steward"** — ver `planning/FASE1/03_DESIGN_TOKENS.md`
