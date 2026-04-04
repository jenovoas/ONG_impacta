# Arquitectura de Componentes — Impacta+ Frontend
## Fase 1 MVP

> Base: shadcn/ui + TailwindCSS
> Todos los componentes custom extienden o componen primitivos de shadcn/ui

---

## 1. Layout Components

### `AppShell`
Wrapper principal del dashboard. Contiene Sidebar + Topbar + área de contenido.
```
Props: children, sidebarCollapsed?
```

### `Sidebar`
Navegación lateral con grupos de módulos.
- Colapsable (icono only / icono + label)
- Indicador de módulo activo
- Badge de notificaciones por módulo
- Logo ONG en la parte superior

```
Props: collapsed, onToggle, currentPath, ongLogo?
```

### `Topbar`
Barra superior del dashboard.
- Búsqueda global (Command+K / `⌘K`)
- Campana de notificaciones con dropdown
- Avatar + menú de perfil (idioma, tema, logout)
- Nombre ONG actual

### `PageHeader`
Encabezado estándar de cada página.
```
Props: title, subtitle?, breadcrumbs[], actions?: ReactNode
```

---

## 2. Data Display Components

### `DataTable`
Tabla reutilizable basada en TanStack Table.
```
Props: columns, data, pagination, filters?, searchable?, exportable?
Slots: rowActions, emptyState
```
Funciones built-in: paginación, ordenamiento, filtros de columna, exportar CSV/Excel, selección múltiple.

### `StatCard`
Tarjeta de métrica/KPI.
```
Props: title, value, unit?, delta?, deltaType: 'up'|'down'|'neutral', icon, color?
```

### `StatusBadge`
Badge semántico de estado.
```
Estados: activo | inactivo | pendiente | completado | cancelado | moroso | en_riesgo
```

### `Timeline`
Historial de actividad cronológico (usado en perfiles de socios, casos sociales).
```
Props: events: { date, title, description, type, user? }[]
```

### `Chart`
Wrapper de Recharts con tema oscuro preconfigurado.
```
Tipos: LineChart | BarChart | AreaChart | PieChart | RadialBar
Props: data, xKey, yKey, title?, legend?
```

### `DonationThermometer`
Termómetro visual de progreso de recaudación.
```
Props: current, goal, currency, label?
```

### `OrgChart`
Organigrama interactivo de cargos y roles.
```
Props: nodes: { id, name, role, cargo, parentId?, avatar? }[]
```

---

## 3. Form Components

### `FormStep`
Wrapper para formularios multi-step.
```
Props: steps: { label, component }[], onComplete, currentStep, onStepChange
```

### `FileUpload`
Upload con preview para imágenes y documentos.
```
Props: accept, maxSize, multiple?, onUpload, preview?
```

### `DateRangePicker`
Selector de rango de fechas.
```
Props: value, onChange, presets?: ('hoy'|'semana'|'mes'|'año')[]
```

### `AddressInput`
Campo de dirección con autocompletado (Google Places o libre).
```
Props: value, onChange, country?
```

### `CurrencyInput`
Input numérico formateado para montos en CLP / USD / EUR / UF.
```
Props: value, onChange, currency: 'CLP'|'USD'|'EUR'|'UF'
```

### `SignaturePad`
Firma digital para confirmación de entregas de ayuda.
```
Props: onSave, label?
```

### `SearchableSelect`
Select con búsqueda interna para listas largas (socios, especies, etc.).
```
Props: options, value, onChange, placeholder, searchable?
```

---

## 4. Feedback Components

### `EmptyState`
Estado vacío estándar con ícono, mensaje y CTA opcional.
```
Props: icon, title, description, action?: { label, onClick }
```

### `LoadingSkeleton`
Skeleton loaders para DataTable, StatCard, y formularios.
```
Variantes: table | cards | form | profile
```

### `ConfirmDialog`
Modal de confirmación para acciones destructivas.
```
Props: title, description, confirmLabel, onConfirm, variant: 'danger'|'warning'
```

### `Toast / Notifications`
Sistema de notificaciones (usa Sonner).
```
Tipos: success | error | warning | info
```

---

## 5. Domain-Specific Components

### `MemberCard`
Tarjeta compacta de socio/voluntario (usada en listas, selects).
```
Props: member: { name, avatar, role, status, memberSince }
```

### `EventCard`
Tarjeta de evento para listados y dashboard.
```
Props: event: { title, date, location, capacity, registered, type, image? }
```

### `SpeciesCard`
Tarjeta de especie del catálogo.
```
Props: species: { commonName, scientificName, category, conservationStatus, image }
```

### `TransactionRow`
Fila de transacción con estado de conciliación.
```
Props: transaction: { date, donor, amount, currency, method, status, reconciled }
```

### `TaskKanbanCard`
Tarjeta de tarea para vista Kanban.
```
Props: task: { title, assignee, dueDate, priority, status, tags? }
```

### `MapView`
Mapa interactivo (Leaflet) para avistamientos y beneficiarios.
```
Props: markers: { lat, lng, title, type, popup? }[], center?, zoom?
```

### `PaymentForm`
Formulario de pago con integración a pasarelas.
```
Props: amount, currency, description, onSuccess, onError, methods: ('mp'|'paypal'|'stripe')[]
```

---

## 6. Shared Utilities

### `LanguageToggle`
Selector ES / EN. Persiste en localStorage.

### `ThemeToggle`
Dark / Light mode. Persiste en localStorage.

### `ExportButton`
Botón con dropdown para exportar a CSV, Excel, PDF.
```
Props: onExport: (format: 'csv'|'xlsx'|'pdf') => void
```

### `PrintButton`
Dispara `window.print()` con estilos de impresión preconfigurados.

---

## 7. Estructura de carpetas (apps/web/src)

```
src/
├── components/
│   ├── layout/          → AppShell, Sidebar, Topbar, PageHeader
│   ├── data-display/    → DataTable, StatCard, Chart, Timeline, OrgChart
│   ├── forms/           → FormStep, FileUpload, DateRangePicker, CurrencyInput
│   ├── feedback/        → EmptyState, LoadingSkeleton, ConfirmDialog
│   ├── domain/          → MemberCard, EventCard, SpeciesCard, MapView, PaymentForm
│   └── shared/          → LanguageToggle, ThemeToggle, ExportButton
├── pages/               → Una carpeta por módulo (socios/, eventos/, etc.)
├── hooks/               → useAuth, useTenant, usePermissions, useExport
├── stores/              → authStore, tenantStore, uiStore (Zustand)
├── services/            → api clients por módulo
├── lib/                 → utils, formatters, constants
└── i18n/                → es.json, en.json
```

---

## 8. Convenciones

- Todos los colores del tema via CSS variables (no hardcoded en clases Tailwind)
- `dark:` prefix para variantes oscuras solo cuando shadcn/ui no lo cubre
- Formularios: React Hook Form + Zod en todos los casos
- Data fetching: TanStack Query para todo (no fetch directo en componentes)
- Estado global solo para: auth, tenant, preferencias UI (no datos de servidor)
- Tamaño máximo de componente: 200 líneas. Si supera → dividir
