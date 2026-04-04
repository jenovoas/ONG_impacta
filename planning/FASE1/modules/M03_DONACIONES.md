# M03 — Donaciones y Pagos
## FASE 1

---

## Responsabilidad única (SRP)
Gestión de donaciones monetarias y en especie, campañas de recaudación, y procesamiento de pagos online. Las cuotas de socios usan `MemberPaymentsService` (M01), no este módulo.

---

## ⚠️ Prototipo de referencia visual

> **`/proto` es de SOLO LECTURA. No escribir código ahí. No copiar HTML.**
> Abrir en el navegador como referencia visual y recrear en React + shadcn/ui.

| Estado | Archivo | Pantallas que cubre |
|--------|---------|---------------------|
| ✅ Disponible | `proto/donaciones-transparencia.html` | P01 Dashboard donaciones, P02 Transacciones, P03 Detalle, P04 Nueva donación, P06 Campañas, P07 Nueva campaña |
| ✅ Disponible | `proto/donaciones-transparencia-es.html` | Variante español (misma estructura) |

Referencia primaria: **`proto/donaciones-transparencia.html`**

---

## Backend

```
donations/
├── donations.module.ts
├── donations.controller.ts
├── campaigns.controller.ts
├── webhooks.controller.ts        ← rutas públicas /donations/webhook/*
├── donations.service.ts
├── campaigns.service.ts
├── certificates.service.ts       ← genera PDF
└── dto/
    ├── create-donation.dto.ts
    ├── create-campaign.dto.ts
    └── checkout.dto.ts

payments/                         ← packages/payments/
├── payments.module.ts
├── payments.service.ts           ← IPaymentProvider factory
├── providers/
│   ├── payment-provider.interface.ts   ← ISP: interfaz pequeña
│   ├── mercadopago.provider.ts
│   ├── stripe.provider.ts
│   └── paypal.provider.ts
└── dto/
    └── checkout-session.dto.ts
```

### Interfaz de pasarela (OCP + ISP)
```typescript
// packages/payments/src/providers/payment-provider.interface.ts
export interface IPaymentProvider {
  createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession>
  verifyWebhook(payload: string, signature: string): boolean
  processWebhook(payload: unknown): Promise<PaymentResult>
  refund(externalId: string, amount?: number): Promise<void>
}

interface CheckoutParams {
  externalRef: string     // donationId
  amount: number          // en centavos/pesos
  currency: string        // CLP, USD
  description: string
  donorEmail: string
  successUrl: string
  cancelUrl: string
}
```

### Certificado de donación
- Librería: `@react-pdf/renderer` (generación server-side)
- Template: logo ONG, nombre donante, RUT, monto, fecha, referencia legal Ley 19.885
- Se genera y sube a MinIO al recibir webhook de pago exitoso
- URL guardada en `donations.certificateUrl`

---

## Frontend

### M03-01 — `/donaciones`

**Dashboard con 4 KPIs (StatCard):**
```
1. Total recaudado este mes (CLP) — delta vs mes anterior
2. Número de donaciones este mes — delta
3. Donación promedio — delta
4. Meta de campaña activa % — si hay campaña activa
```

**Gráfico de área:** serie temporal últimos 30 días (monto diario)
Componente: `Chart` tipo `AreaChart`, datos de `GET /donations/stats`

**Últimas 10 transacciones:** tabla compacta sin paginación
Columnas: donante, monto, método, estado, fecha, acciones

**Filtros rápidos (tabs):** Todas | Monetarias | En especie | Recurrentes

---

### M03-02 — `/donaciones/transacciones`

**DataTable completa:**
| Campo | Tipo |
|-------|------|
| Donante | nombre + email |
| Campaña | link a campaña (si existe) |
| Monto | CurrencyDisplay |
| Método | badge (icono de MercadoPago/Stripe/etc.) |
| Tipo | badge (MONETARY/IN_KIND) |
| Frecuencia | badge |
| Estado | StatusBadge |
| Fecha | fecha local |
| Acciones | ver, descargar certificado |

**Filtros:** campaña, método, estado, tipo, fecha desde/hasta, monto mín/máx

---

### M03-03 — `/donaciones/nueva`

**Formulario de donación manual (interna):**
```
- campaignId (SearchableSelect de campañas activas, opcional)
- donorName (Input, required)
- donorEmail (Input email, required)
- donorRut (Input, validación dígito verificador)
- donorPhone (Input)
- type (ToggleGroup: "Monetaria" | "En especie")

[Si MONETARY:]
- amount (CurrencyInput, CLP)
- frequency (ToggleGroup: "Única" | "Mensual" | "Anual")
- method (Select: CASH | TRANSFER | CHECK | OTHER)
- paidAt (DatePicker, default: hoy)

[Si IN_KIND:]
- inKindDesc (Textarea, descripción del bien)
- inKindValue (CurrencyInput, valor estimado)

- isAnonymous (Checkbox "Donación anónima")
- notes (Textarea)
```

---

### M03-04 — `/donaciones/campanas`

**Grid de CampaignCard:**
```
CampaignCard
├── Imagen (o placeholder)
├── Título
├── Progress bar (actual / meta) con porcentaje
├── Monto recaudado + meta (CLP formateado)
├── Fecha límite (si existe)
├── StatusBadge (activa / finalizada)
└── Link "Ver detalle" → /donaciones/campanas/:id
```

**Acción header:** Button "Nueva campaña"

---

### M03-05 — `/donaciones/campanas/nueva` y `/donaciones/campanas/:id/editar`

```
- title (Input, required)
- description (Textarea)
- goal (CurrencyInput CLP, required)
- currency (Select: CLP | USD, default CLP)
- startDate (DatePicker, default hoy)
- endDate (DatePicker, opcional)
- isPublic (Toggle: "Visible en landing pública")
- imageUrl (FileUpload, imagen)
```

---

### M03-06 — `/donaciones/campanas/:id`

```
CampaignDetailPage
├── PageHeader: título + StatusBadge + acciones (editar, cerrar)
├── Hero: imagen + DonationThermometer (grande, prominente)
│   └── Monto recaudado | Meta | Porcentaje | Días restantes
├── Grid 2 columnas
│   ├── Left: estadísticas (donaciones, promedio, top donantes)
│   └── Right: últimas donaciones (lista compacta)
└── Button "Registrar donación para esta campaña"
```

**DonationThermometer:**
```typescript
// props:
{
  current: number      // monto actual
  goal: number         // meta
  currency: string     // "CLP"
  label?: string       // texto adicional
}
// Renderiza: barra de progreso vertical o horizontal + porcentaje + montos
```

---

## Widget de donación pública (landing)

Componente `PublicDonationForm` embebido en la landing de cada ONG:
```
- amount (botones sugeridos: $5.000 | $10.000 | $25.000 + campo libre)
- frequency (Una vez | Mensual)
- donorName, donorEmail, donorRut
- method (MercadoPago | PayPal | Stripe — según lo que tenga configurado la ONG)
- Button "Donar ahora" → POST /donations/checkout → redirect a pasarela
```

---

## Reglas de negocio

1. Solo ADMIN_ONG y COORDINATOR con permiso `donations:write` pueden crear donaciones manuales
2. Las donaciones creadas por webhook (pasarela) se crean con status PAID automáticamente
3. El certificado PDF solo se genera para donaciones con `donorRut` no nulo
4. Una donación PAID no puede eliminarse, solo reembolsarse (cambia a status REFUNDED)
5. Si la campaña tiene `endDate < hoy`: no acepta nuevas donaciones. Mostrar "Campaña finalizada"
6. Donación recurrente MONTHLY: BullMQ crea job mensual para cobrar automáticamente

---

## i18n — claves

```json
{
  "donations": {
    "title": "Donaciones",
    "new": "Registrar donación",
    "method": {
      "CASH": "Efectivo",
      "TRANSFER": "Transferencia",
      "MERCADOPAGO": "MercadoPago",
      "PAYPAL": "PayPal",
      "STRIPE": "Stripe",
      "CHECK": "Cheque",
      "OTHER": "Otro"
    },
    "frequency": {
      "ONE_TIME": "Única",
      "MONTHLY": "Mensual",
      "ANNUAL": "Anual"
    },
    "type": {
      "MONETARY": "Monetaria",
      "IN_KIND": "En especie"
    }
  },
  "campaigns": { "title": "Campañas" }
}
```
