# M10 — Email Marketing y Comunicaciones
## FASE 2

---

## Responsabilidad única (SRP)
Envío masivo de emails segmentados a socios, voluntarios y donantes. Automatizaciones básicas (bienvenida, recordatorios). No gestiona notificaciones push (eso es la app móvil M14).

---

## Backend

```
email-marketing/
├── email-marketing.module.ts
├── campaigns.controller.ts       ← /email-campaigns
├── campaigns.service.ts
├── email.service.ts              ← wrapper de SendGrid/Resend
├── templates.service.ts          ← templates HTML prediseñados
└── dto/
    ├── create-campaign.dto.ts
    └── send-campaign.dto.ts
```

### Segmentación disponible
```typescript
type EmailSegment =
  | 'all'           // todos los usuarios activos
  | 'members'       // solo socios ACTIVE
  | 'volunteers'    // solo voluntarios ACTIVE
  | 'donors'        // solo donantes que han donado en los últimos 12 meses
  | 'overdue'       // socios MOROSOS
```

### Envío con BullMQ
```
Al enviar una campaña:
1. Obtener lista de emails del segmento
2. Crear job BullMQ por cada lote de 100 emails
3. Cada job llama a SendGrid/Resend API
4. Actualizar sentCount progresivamente
5. Al completar: notificar al admin via in-app notification
```

---

## Frontend — `/email-marketing`

**Tabs: Campañas | Plantillas | Automatizaciones**

### Tab Campañas

```
DataTable de EmailCampaign:
| Nombre | Segmento | Estado | Enviados | Aperturas | Clicks | Fecha |
| DRAFT/SCHEDULED/SENT |

Button "Nueva campaña"
```

### Formulario nueva campaña (multi-step)

**Paso 1: Configuración**
```
- title (nombre interno)
- subject (asunto del email)
- targetSegment (Select: Todos | Socios | Voluntarios | Donantes | Morosos)
- scheduledAt (DateTimePicker, opcional → si vacío: envío inmediato)
```

**Paso 2: Contenido**
```
- templateId (Select: elegir plantilla base)
- Editor de contenido (rich text simple o HTML directo)
- Preview en tiempo real (iframe)
```

**Paso 3: Revisión y envío**
```
- Resumen: segmento (N contactos), asunto, programación
- Button "Enviar ahora" o "Programar"
- ConfirmDialog antes de enviar
```

### Tab Automatizaciones

```
Lista de automatizaciones configurables:
1. ☐ Email de bienvenida (al registrar nuevo socio)
2. ☐ Recordatorio de cuota (3 días antes del vencimiento)
3. ☐ Aviso de mora (al pasar a OVERDUE)
4. ☐ Confirmación de donación (post-pago)
5. ☐ Recordatorio de evento (24h antes)
6. ☐ Certificado de donación (auto envío post-pago)

Cada automatización: Toggle activo/inactivo
```

---

## Reglas de negocio
1. Respetar opt-out: si un usuario tiene `emailOptOut=true`, no incluirlo en ninguna campaña
2. Límite de envío según plan: Free=200/mes, Basic=1000/mes, Pro=ilimitado
3. No enviar a emails inválidos o bounced (mantener lista de supresión)
