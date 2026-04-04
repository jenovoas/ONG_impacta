# M18 — Sistema de Emergencias y Respuesta Rápida
## FASE 3

---

## Responsabilidad única
Emisión de alertas masivas a voluntarios y socios ante emergencias. Activación de protocolos de respuesta. Requiere app móvil (Fase 2) para notificaciones push.

---

## Backend
```
emergencies/
├── emergencies.module.ts
├── alerts.controller.ts          ← /emergencies/alerts
├── alerts.service.ts
├── notifications.service.ts      ← push + SMS + email
└── dto/
    ├── create-alert.dto.ts
    └── update-alert.dto.ts
```

### Endpoints
```
GET  /emergencies/alerts           lista de alertas (activas + historial)
POST /emergencies/alerts           crear y emitir alerta
GET  /emergencies/alerts/:id       detalle + estadísticas de notificaciones
PATCH /emergencies/alerts/:id/resolve  marcar como resuelta
```

### Proceso de emisión de alerta
```
alerts.service.ts → create() + emit()
1. Crear EmergencyAlert en BD
2. Obtener lista de voluntarios activos (+ filtro geográfico si hay radio)
3. BullMQ job ALTA PRIORIDAD:
   a. Push notification via FCM (si tienen app móvil)
   b. Email via SendGrid/Resend
   c. SMS via Twilio (si configurado)
4. Actualizar sentCount
5. WebSocket broadcast a todos los usuarios online de la ONG
```

---

## Frontend — `/emergencias`

```
EmergencyPage
├── Banner de alerta activa (si existe) — rojo prominente, imposible ignorar
│   "⚠️ ALERTA ACTIVA: [título] — [hace X minutos]"
│   Button "Ver detalles" | Button "Marcar como resuelta"
│
├── Button "Emitir nueva alerta" (rojo, prominent)
│
└── Historial de alertas (DataTable):
    | Título | Severidad | Tipo | Enviados | Fecha | Estado |
```

### Formulario nueva alerta (Modal grande)
```
EmergencyAlertModal
⚠️ Banner "Esta acción enviará notificaciones masivas"

- title (Input, required, máx 80 chars)
- message (Textarea, required, máx 500 chars)
- severity (SegmentedControl: BAJO | MEDIO | ALTO | CRÍTICO)
  Colores: azul | ámbar | naranja | rojo
- type (Select: Desastre natural | Salud | Seguridad | Otro)
- Geolocalización (opcional):
  ☐ Filtrar por zona
  └── MapView interactivo + radius slider (1-50 km)
- Canales:
  ☑ Push notifications (app móvil)
  ☑ Email
  ☐ SMS (requiere Twilio configurado)

ConfirmDialog doble:
  "¿Confirmas emitir esta alerta? Se notificará a N voluntarios/socios."
  Input: escribir "CONFIRMAR" para habilitar el botón
  Button "Emitir alerta" (rojo)
```

---

## Reglas de negocio
1. Solo ADMIN_ONG puede crear alertas de emergencia
2. Las alertas críticas no se pueden cancelar una vez emitidas
3. Máximo 1 alerta activa a la vez por ONG (previene spam)
4. Al marcar como resuelta: enviar notificación de resolución a los mismos destinatarios
5. Las alertas se archivan (no se eliminan) — auditoría ITIL
