# M01 — Socios y Voluntarios
## FASE 1

---

## Responsabilidad única (SRP)
Gestión del directorio de personas vinculadas a la ONG: socios (con membresía y cuotas) y voluntarios (con habilidades y disponibilidad). No incluye pagos de donaciones (M03).

---

## Backend — `apps/api/src/modules/`

### Módulos NestJS
```
members/
├── members.module.ts
├── members.controller.ts        ← rutas /members
├── members.service.ts           ← lógica de negocio
├── member-payments.service.ts   ← cálculo de cuotas y morosidad
└── dto/
    ├── create-member.dto.ts
    ├── update-member.dto.ts
    └── register-payment.dto.ts

volunteers/
├── volunteers.module.ts
├── volunteers.controller.ts
├── volunteers.service.ts
└── dto/
    ├── create-volunteer.dto.ts
    └── update-volunteer.dto.ts

roles/
├── roles.module.ts
├── roles.controller.ts
├── roles.service.ts
└── dto/
    ├── create-role.dto.ts
    └── update-role.dto.ts
```

### Validaciones de negocio
- RUT chileno: validar dígito verificador antes de guardar
- Email único por organización (constraint en BD + error 409 si duplicado)
- `memberNumber`: auto-incrementar por organización si no se provee
- `monthlyFee`: no puede ser negativo
- `status` DECEASED: no se puede reactivar, solo registrar históricamente

### Cálculo de morosidad
```
Un socio está MOROSO si:
- tiene períodos anteriores al mes actual con status PENDING o OVERDUE
- La deuda se calcula: count(períodos morosos) × monthlyFee
```

---

## Frontend

### M01-01 — `/socios`

**Layout:** PageHeader + DataTable

**Columnas DataTable:**
| Campo | Tipo | Sortable | Filtrable |
|-------|------|----------|-----------|
| # | memberNumber | No | No |
| Nombre | nombre + avatar | Sí | Búsqueda libre |
| Email | texto | No | No |
| Cargo | badge | No | Select |
| Membresía | texto | No | No |
| Cuota mes actual | StatusBadge (PAID/PENDING/OVERDUE) | No | Select |
| Estado | StatusBadge | Sí | Select |
| Acciones | botones | No | No |

**Filtros disponibles:**
- Búsqueda: nombre, email, RUT
- Estado: Todos / Activo / Inactivo / Suspendido
- Cargo: dropdown con valores únicos de la ONG

**Acciones de fila:**
- Ojo → `/socios/:id`
- Lápiz → `/socios/:id/editar`
- Trash → ConfirmDialog → soft delete

**PageHeader actions:**
- Button "Nuevo socio" (primary) → `/socios/nuevo`
- ExportButton → CSV con todos los campos

---

### M01-02 — `/socios/nuevo` y `/socios/:id/editar`

**FormStep — 3 pasos:**

**Paso 1: Datos Personales**
```
- name (Input, required)
- rut (Input, validación dígito verificador)
- email (Input email, required, único)
- phone (Input, format "+56 9 XXXX XXXX")
- birthDate (DatePicker)
- address (Input)
- city (Input)
- region (Select, lista regiones Chile)
- avatarUrl (FileUpload, imagen, opcional)
```

**Paso 2: Membresía**
```
- membershipType (Select: "Activo" | "Honorario" | "Fundador" | "Otro")
- monthlyFee (CurrencyInput, CLP)
- memberSince (DatePicker, default: hoy)
- memberNumber (Input, auto-generado si vacío)
```

**Paso 3: Cargo y Notas**
```
- cargo (Select: "Presidente/a" | "Vicepresidente/a" | "Secretario/a" | "Tesorero/a" | "Director/a de Proyectos" | "Director/a de Comunicaciones" | "Coordinador de Voluntarios" | "Consejero/a" | "Otro")
- notes (Textarea)
- createUserAccount (Checkbox: "Crear cuenta de acceso y enviar invitación")
```

**Acciones:**
- "Cancelar" → volver sin guardar (ConfirmDialog si hay cambios)
- "Anterior" (pasos 2 y 3)
- "Siguiente" (pasos 1 y 2, valida el paso actual antes de avanzar)
- "Guardar" (paso 3) → POST /members → toast success → redirect /socios/:id

---

### M01-03 — `/socios/:id`

**Layout:** PageHeader con acciones + Tabs

**PageHeader:**
- Avatar + Nombre + StatusBadge(status) + Badge(cargo)
- Acciones: "Editar" | "Registrar pago" | "..." (más opciones)

**Tab: Información**
```
Grid 2 columnas:
- RUT, Email, Teléfono, Dirección
- Tipo membresía, Cuota mensual, Socio desde
- Cargo, Notas
```

**Tab: Cuotas**
```
KPIs: Deuda total | Meses al día | Meses morosos
Timeline de pagos por mes (12 meses anteriores + mes actual)
Cada mes: período | monto | método | estado | fecha pago | acciones
Botón "Registrar pago" → Sheet lateral con formulario:
  - period (Select: meses con PENDING/OVERDUE)
  - amount (pre-llenado con monthlyFee, editable)
  - method (Select: CASH | TRANSFER | MERCADOPAGO | ...)
  - notes (Input)
```

**Tab: Eventos**
```
Lista de EventRegistrations del socio
Columnas: evento, fecha, estado pago, check-in
```

**Tab: Historial**
```
Timeline de AuditLog del socio
Cada entrada: fecha | acción | usuario | cambios
```

---

### M01-04 — `/voluntarios`

Mismo patrón que `/socios` con columnas adaptadas:

| Campo | Descripción |
|-------|-------------|
| Nombre | con avatar |
| Email | texto |
| Habilidades | badges (máx 3 visibles) |
| Áreas | badges |
| Disponibilidad | días de la semana como iconos |
| Estado | StatusBadge |

---

### M01-05 — `/voluntarios/nuevo` y `/voluntarios/:id/editar`

**FormStep — 2 pasos:**

**Paso 1: Datos Personales**
```
- name, rut, email, phone (igual que socios)
- birthDate, address, city
```

**Paso 2: Perfil de Voluntario**
```
- skills (MultiSelect con opciones predefinidas + campo libre)
  Opciones: "Primeros auxilios" | "Conducción" | "Fotografía" | "Carpintería" | "Cocina" | "Educación" | "Medicina" | "Derecho" | "Informática" | "Otro"
- areas (MultiSelect)
  Opciones: "Ecología" | "Ayuda social" | "Eventos" | "Administración" | "Comunicaciones" | "Logística"
- availability (ToggleGroup por día: Lun Mar Mie Jue Vie Sab Dom)
- notes (Textarea)
```

---

### M01-06 — `/organigrama`

```
OrgChartPage
├── PageHeader "Organigrama" + Button "Editar cargos"
└── OrgChart (árbol vertical)
    Cada nodo:
    - Avatar
    - Nombre
    - Cargo (bold)
    - StatusBadge
```

**Datos:** GET /members?cargo=notnull, ordenados por jerarquía de cargo.

---

## Reglas de negocio

1. Un socio puede ser también voluntario (mismo email, diferentes registros en tablas distintas)
2. Un socio puede tener cuenta de usuario (userId) o no (funciona sin cuenta)
3. El cargo "Presidente/a" solo puede existir una vez por ONG a la vez — validar en backend
4. Al cambiar estado a INACTIVE: las cuotas pendientes futuras se cancelan automáticamente
5. Al registrar pago con método MERCADOPAGO/STRIPE: redirigir al flujo de checkout (M03)

---

## i18n — claves necesarias (agregar en `es.json` y `en.json`)

```json
{
  "members": {
    "title": "Socios",
    "new": "Nuevo socio",
    "edit": "Editar socio",
    "status": {
      "ACTIVE": "Activo",
      "INACTIVE": "Inactivo",
      "SUSPENDED": "Suspendido",
      "DECEASED": "Fallecido"
    },
    "cargo": {
      "presidente": "Presidente/a",
      "vicepresidente": "Vicepresidente/a",
      "secretario": "Secretario/a",
      "tesorero": "Tesorero/a"
    }
  },
  "volunteers": {
    "title": "Voluntarios",
    "new": "Nuevo voluntario"
  }
}
```
