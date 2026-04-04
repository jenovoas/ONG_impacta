# M08 — Reportes, Landing Pública y Configuración
## FASE 1

---

## M08a — Reportes y Analytics

### Responsabilidad única
Generación de reportes exportables (PDF, Excel, CSV) sobre socios, donaciones, impacto y finanzas. No duplica datos; consume los endpoints de los otros módulos.

### Backend

```
reports/
├── reports.module.ts
├── reports.controller.ts         ← /reports/*
├── reports.service.ts
├── pdf.service.ts                ← generación PDF con puppeteer/react-pdf
└── export.service.ts             ← CSV y Excel con exceljs
```

### Endpoints de reportes
```
GET /reports/members?dateFrom&dateTo&format=json|csv|pdf
GET /reports/donations?dateFrom&dateTo&campaignId&format=json|csv|pdf
GET /reports/events?dateFrom&dateTo&format=json|csv|pdf
GET /reports/impact?dateFrom&dateTo&format=json|csv|pdf
```

### Frontend — `/reportes`

```
ReportsPage
├── PageHeader "Reportes"
└── Grid de ReportCard (4 tarjetas):
    1. ReportCard "Socios"
       - Descripción: altas, bajas, morosidad, cuotas
       - Icono: Users
       - Button "Generar" → abre DateRangePicker modal + formato
    2. ReportCard "Donaciones"
       - Descripción: recaudación por campaña, método, período
       - Icono: Heart
    3. ReportCard "Eventos y Rifas"
       - Descripción: asistencia, recaudación por evento
       - Icono: CalendarDays
    4. ReportCard "Impacto Social y Ecológico"
       - Descripción: beneficiarios atendidos, jornadas, especies registradas
       - Icono: Leaf
```

**Modal "Generar reporte":**
```
- Período: DateRangePicker (desde/hasta)
- Formato: ToggleGroup [JSON/Vista | CSV | PDF]
- Button "Generar"
  → Si JSON: navega a /reportes/:tipo con tabla
  → Si CSV/PDF: descarga directa
```

### Frontend — `/reportes/:tipo` (vista previa)

```
ReportPreviewPage
├── PageHeader con título del reporte + período seleccionado
├── ExportButton (descargar en CSV o PDF)
└── Contenido según tipo:
    - members: DataTable + KPIs de morosidad
    - donations: DataTable + gráficos
    - impact: KPIs + gráficos de barras
```

---

## M08b — Landing Page Pública

### Responsabilidad única
Generación y personalización de la landing page pública de cada ONG. La landing se sirve desde `apps/landing` (Next.js). Los datos se obtienen de la API via `/public/:slug`.

### Backend — endpoint público (sin auth)

```
landing/
├── landing.module.ts
└── landing.controller.ts         ← GET /public/:slug
```

```
GET /public/:slug
Retorna datos públicos de la ONG:
{
  "data": {
    "name": "string",
    "slug": "string",
    "description": "string|null",
    "logoUrl": "string|null",
    "coverImageUrl": "string|null",
    "website": "string|null",
    "city": "string|null",
    "activeCampaign": { id, title, goal, current, endDate } | null,
    "upcomingEvents": [{ id, title, startDate, location, imageUrl }],
    "stats": {
      "members": 120,
      "volunteers": 45,
      "donationsTotal": 5000000,
      "beneficiaries": 200
    }
  }
}
```

### Frontend — `apps/landing/app/ong/[slug]/page.tsx`

**Estructura de la landing pública por ONG:**

```
OngLandingPage (Next.js Server Component)
├── Navbar
│   ├── Logo ONG
│   ├── Links: Inicio | Nosotros | Proyectos | Contacto
│   ├── LanguageToggle (ES/EN)
│   └── Button "Donar ahora" (primary, brand)
│
├── Hero Section
│   ├── Background: imagen o gradiente de marca
│   ├── Nombre ONG (Montserrat, grande)
│   ├── Descripción (Inter)
│   ├── Button "Conocer más" (scroll down)
│   └── Button "Donar ahora" (si hay campaña activa)
│
├── Stats Section (si stats disponibles)
│   4 KPIs: socios | voluntarios | donaciones totales | beneficiarios
│
├── Campaña Activa (si existe)
│   ├── DonationThermometer
│   └── Button "Contribuir" → /ong/:slug/donar
│
├── Próximos Eventos (si existen)
│   Grid de EventCard (máx 3)
│
├── Sección "Sobre Nosotros"
│   Texto de descripción
│
├── Formulario de Contacto / Voluntariado
│   - nombre, email, mensaje, tipo (contacto/voluntariado)
│   → POST /public/:slug/contact
│
└── Footer
    Logo | Links | Copyright | Redes sociales
```

### Frontend — `apps/landing/app/ong/[slug]/donar/page.tsx`

```
PublicDonationPage
├── Hero mini con nombre ONG
└── PublicDonationForm (Client Component):
    ├── amounts (botones: $5.000 | $10.000 | $25.000 | "Otro")
    ├── customAmount (CurrencyInput, si selecciona "Otro")
    ├── frequency (ToggleGroup: "Una vez" | "Mensual")
    ├── donorName (Input)
    ├── donorEmail (Input email)
    ├── donorRut (Input, para certificado)
    ├── method (los configurados por la ONG)
    └── Button "Donar" → POST /donations/checkout
```

---

## M08c — Configuración ONG

### Frontend — `/configuracion`

**Tabs: Organización | Usuarios | Pagos | Notificaciones | Plan**

**Tab Organización:**
```
Form:
- logoUrl (FileUpload imagen)
- name (Input)
- legalName (Input)
- rut (Input)
- email (Input)
- phone (Input)
- address, city, region (Inputs + Select)
- description (Textarea)
- website (Input URL)
Button "Guardar cambios"
```

**Tab Usuarios:**
```
DataTable de usuarios de la ONG:
| Nombre | Email | Rol | Estado | Acciones |
- Acciones: cambiar rol, desactivar

Button "Invitar usuario" → Sheet:
  - email, name, systemRole (Select)
  → POST /settings/users/invite → envía email de invitación
```

**Tab Pagos:**
```
Cards por pasarela:
1. MercadoPago
   - Status: Conectado / No configurado
   - Input ACCESS_TOKEN
   - Input PUBLIC_KEY
   - Button "Guardar"

2. Stripe
   - Input SECRET_KEY
   - Input PUBLISHABLE_KEY
   - Input WEBHOOK_SECRET
   - Button "Guardar"

3. PayPal
   - Input CLIENT_ID
   - Input CLIENT_SECRET
   - Button "Guardar"
```

**Tab Plan:**
```
PlanCard (plan actual):
- Nombre del plan
- Características incluidas (lista con ✓)
- Fecha de vencimiento (si aplica)
- Button "Cambiar plan" → muestra tabla de planes + upgrade

Historial de facturación (si plan de pago)
```

---

## Reglas de negocio

1. Los reportes de más de 1.000 filas se generan como job BullMQ (async) y se notifica al usuario cuando están listos
2. La landing pública es de solo lectura; no requiere autenticación
3. Los tokens de pasarelas de pago se almacenan cifrados (AES-256) en BD; nunca en logs
4. Un ADMIN_ONG no puede cambiar su propio rol ni eliminarse a sí mismo
5. Al invitar usuario: si el email ya existe en la plataforma (otra ONG), reutilizar el User; si no, crear nuevo

---

## i18n — claves

```json
{
  "reports": {
    "title": "Reportes",
    "generate": "Generar reporte",
    "period": "Período",
    "format": "Formato"
  },
  "settings": {
    "title": "Configuración",
    "organization": "Organización",
    "users": "Usuarios",
    "payments": "Pasarelas de pago",
    "plan": "Plan y facturación"
  }
}
```
