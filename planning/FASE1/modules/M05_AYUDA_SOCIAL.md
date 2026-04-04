# M05 — Ayuda Social
## FASE 1

---

## Responsabilidad única (SRP)
Registro y seguimiento de beneficiarios y las entregas de ayuda realizadas. No gestiona inventario de insumos (Fase 2 — M15 Logística).

---

## ⚠️ Prototipo de referencia visual

> **`/proto` es de SOLO LECTURA. No escribir código ahí. No copiar HTML.**
> Abrir en el navegador como referencia visual y recrear en React + shadcn/ui.

| Estado | Archivo | Pantallas que cubre |
|--------|---------|---------------------|
| ❌ Pendiente | `proto/ayuda-social.html` | AS01 Lista beneficiarios + mapa, AS02 Detalle + historial, AS03 Formulario registro, AS04 Registrar entrega, AS05 Mapa |

**Antes de implementar este sprint**: crear el prototipo en Stitch
(proyecto `4741044715461206908`), exportar a `/proto/` y actualizar `planning/UI_PROTOTYPES_STITCH.md`.

Guías de diseño para este prototipo:
- Layout split: DataTable izquierda (60%) + mapa Leaflet derecha (40%)
- Detalle de beneficiario: área de firma digital (`SignaturePad`) y upload de fotos
- Usar color acento `#00D4AA` para indicadores de entregas completadas

---

## Backend

```
social-aid/
├── social-aid.module.ts
├── beneficiaries.controller.ts   ← /social-aid/beneficiaries
├── deliveries.controller.ts      ← /social-aid/beneficiaries/:id/deliveries
├── map.controller.ts             ← /social-aid/map (público para admins)
├── beneficiaries.service.ts
├── deliveries.service.ts
└── dto/
    ├── create-beneficiary.dto.ts
    ├── update-beneficiary.dto.ts
    └── create-delivery.dto.ts
```

---

## Frontend

### M05-01 — `/ayuda-social`

**Layout:** PageHeader + Grid (DataTable izquierda + MapView derecha en pantallas > lg)

**DataTable columnas:**
| Campo | Descripción |
|-------|-------------|
| Nombre | con avatar inicial |
| RUT | si existe |
| Teléfono | |
| Familia | "4 personas" |
| Tipos de ayuda | badges (máx 3) |
| Última entrega | fecha |
| Estado | StatusBadge |
| Acciones | ver, editar |

**Filtros:**
- Búsqueda: nombre, RUT
- Tipo de ayuda: MultiSelect (FOOD/MEDICINE/CLOTHES/EDUCATION/HOUSING/ECONOMIC/OTHER)
- Estado: ACTIVE / INACTIVE / GRADUATED

**MapView (Leaflet):**
- Marcadores por coordenada
- Color del marcador según estado: verde = activo, gris = inactivo
- Popup al click: nombre + tipos de ayuda + link "Ver detalle"
- Si no tiene coordenadas: no aparece en el mapa

---

### M05-02 — `/ayuda-social/nuevo` y `/ayuda-social/:id/editar`

**Formulario — 2 pasos:**

**Paso 1: Datos personales**
```
- name (Input, required)
- rut (Input, validación dígito verificador)
- email (Input email)
- phone (Input)
- address (Input)
- city (Input)
- region (Select)
- familySize (Input numérico)
- situation (Textarea: descripción de la situación)
```

**Paso 2: Geolocalización y ayuda**
```
- MapView interactivo: click para colocar pin (actualiza lat/lng)
  Button "Usar mi ubicación actual" (Geolocation API)
- aidTypes (MultiCheckbox)
  ☐ Alimentos    ☐ Ropa    ☐ Medicamentos
  ☐ Educación    ☐ Vivienda  ☐ Económica  ☐ Otro
- notes (Textarea)
```

---

### M05-03 — `/ayuda-social/:id`

```
BeneficiaryDetailPage
├── PageHeader: nombre + StatusBadge + acciones (editar, cambiar estado)
├── Grid 2 columnas
│   ├── Left (8/12):
│   │   ├── Card "Datos personales"
│   │   │   RUT | Email | Teléfono | Dirección | Familia
│   │   ├── Card "Situación"
│   │   │   Situación (texto) | Tipos de ayuda (badges)
│   │   └── Historial de entregas (Timeline)
│   │       Cada entrega: fecha | tipo | descripción | voluntario | foto/firma
│   └── Right (4/12):
│       ├── MapView pequeño (punto del beneficiario)
│       ├── KPIs: total entregas | última entrega | meses atendido
│       └── Button "Registrar nueva entrega"
```

---

### M05-04 — Registrar entrega (Sheet lateral)

Se abre desde `/ayuda-social/:id` como Sheet (no página nueva):

```
Sheet título "Nueva entrega"
├── type (Select: Alimentos | Ropa | Medicamentos | ...)
├── description (Textarea, required: qué se entregó exactamente)
├── quantity (Input: "2 cajas", "1 bolsa", libre)
├── estimatedValue (CurrencyInput, opcional)
├── deliveredById (SearchableSelect de voluntarios activos)
├── notes (Textarea)
├── Separador "Evidencia"
├── photoUrls (FileUpload múltiple, máx 3 fotos, imágenes)
└── signatureUrl (SignaturePad: "Firma del receptor")
    └── Canvas para firma digital
        Botones: "Limpiar" | "Guardar firma"
```

**Acciones:**
- "Cancelar"
- "Registrar entrega" → POST → toast success → actualizar historial

---

### M05-05 — `/ayuda-social/mapa`

**Pantalla completa de mapa:**
```
MapPage
├── MapView (Leaflet, full-screen)
│   ├── Todos los beneficiarios geolocalizados
│   ├── Cluster de marcadores cuando hay muchos cerca
│   └── Popup: nombre + tipos de ayuda + badge estado + link
└── Panel lateral colapsable con filtros:
    - Tipo de ayuda (MultiCheckbox)
    - Estado (Radio: Todos / Activos / Inactivos)
    - Búsqueda por nombre
```

---

## Componente `SignaturePad`

```typescript
// src/components/forms/SignaturePad.tsx
// Librería: react-signature-canvas

interface SignaturePadProps {
  onSave: (dataUrl: string) => void   // retorna base64 PNG
  label?: string
}

// Renderiza: canvas con fondo claro, botón "Limpiar", botón "Guardar"
// Al guardar: convierte canvas a base64, llama onSave
// El componente padre sube la imagen a /uploads/image y guarda la URL
```

---

## Reglas de negocio

1. Un beneficiario puede recibir múltiples tipos de ayuda simultáneamente
2. Status GRADUATED: beneficiario que ya no necesita ayuda pero se mantiene en historial
3. Una entrega sin firma ni foto es válida (campos opcionales)
4. Al registrar entrega: crear AuditLog con los campos cambiados
5. Beneficiario INACTIVE: no aparece en las vistas activas pero sí en el mapa (con marcador gris)

---

## i18n — claves

```json
{
  "social_aid": {
    "title": "Ayuda Social",
    "beneficiaries": "Beneficiarios",
    "new_beneficiary": "Nuevo beneficiario",
    "new_delivery": "Registrar entrega",
    "aid_types": {
      "FOOD": "Alimentos",
      "CLOTHES": "Ropa",
      "MEDICINE": "Medicamentos",
      "EDUCATION": "Educación",
      "HOUSING": "Vivienda",
      "ECONOMIC": "Económica",
      "OTHER": "Otro"
    }
  }
}
```
