# M04 — Eventos y Rifas
## FASE 1

---

## Responsabilidad única (SRP)
M04 gestiona eventos presenciales/virtuales con inscripciones y check-in.
M05 (Rifas) está en este mismo archivo por su estrecha relación operativa, pero son módulos NestJS separados.

---

## Backend

```
events/
├── events.module.ts
├── events.controller.ts
├── events.service.ts
├── registrations.service.ts
├── checkin.service.ts
└── dto/
    ├── create-event.dto.ts
    ├── update-event.dto.ts
    └── registration.dto.ts

raffles/
├── raffles.module.ts
├── raffles.controller.ts
├── raffles.service.ts
├── tickets.service.ts
└── dto/
    ├── create-raffle.dto.ts
    └── buy-ticket.dto.ts
```

### Lógica: Check-in
```
checkin.service.ts
- findByTicketCode(ticketCode): busca EventRegistration
- findByEmail(eventId, email): busca por email
- checkIn(registrationId): sets checkedIn=true, checkedInAt=now()
- si ya checkedIn=true: retornar { alreadyCheckedIn: true } (no error)
```

### Lógica: Sorteo
```
raffles.service.ts → draw(raffleId)
1. Verificar status = CLOSED (no se puede sortear una activa)
2. Obtener todos los tickets con status = PAID
3. Seleccionar índice aleatorio con crypto.randomInt() (criptográfico)
4. Marcar ticket como isWinner=true
5. Actualizar raffle.winnerTicketId
6. Generar acta PDF (puppeteer: número ganador, nombre, fecha, hash de aleatoriedad)
7. Subir acta a MinIO
8. Enviar email al ganador (BullMQ job)
9. Actualizar raffle.status = DRAWN
```

---

## Frontend — Eventos

### M04-01 — `/eventos`

**Layout:** Toggle [Cards | Lista] + filtros

**EventCard:**
```
├── Imagen (o gradient placeholder con ícono del tipo)
├── Badge(tipo: GENERAL | FUNDRAISING | etc.)
├── Título
├── Fecha y hora (format: "Sáb 15 jun · 10:00")
├── Lugar
├── Capacidad: "42 / 100 inscriptos"
├── [Si tiene fundraising]: DonationThermometer (mini)
├── StatusBadge
└── Acciones: "Ver" | "Editar"
```

**Filtros:**
- Tipo: Todos / General / Recaudación / Ecología / Social / ...
- Estado: Borrador / Publicado / Completado / Cancelado
- Fecha: próximos / pasados / DateRangePicker

---

### M04-02 — `/eventos/nuevo` y `/eventos/:id/editar`

**FormStep — 3 pasos:**

**Paso 1: Información básica**
```
- title (Input, required)
- type (Select: GENERAL | FUNDRAISING | ECOLOGY | SOCIAL | TRAINING | MEETING)
- description (Textarea)
- startDate (DateTimePicker, required)
- endDate (DateTimePicker, opcional)
- location (Input: nombre del lugar)
- address (Input)
- imageUrl (FileUpload, imagen)
- isPublic (Toggle: "Visible en landing pública")
- capacity (Input numérico, opcional = sin límite)
```

**Paso 2: Inscripciones y precio**
```
- price (CurrencyInput, 0 = gratuito)
- currency (Select, default CLP)
- [Si price > 0]: método de pago (mismo checkout que donaciones)
```

**Paso 3: Recaudación (opcional)**
```
- fundraisingEnabled (Toggle)
- [Si habilitado]:
  - fundraisingGoal (CurrencyInput)
  - campaignId (SearchableSelect de campañas activas, o "Crear nueva")
```

---

### M04-03 — `/eventos/:id`

**Tabs: Info | Inscriptos | Check-in | Recaudación**

**Tab Info:** Todos los datos del evento en cards

**Tab Inscriptos:**
```
KPIs: Total inscriptos | Pagados | Pendientes | Asistentes (checkin)
DataTable de EventRegistration:
  - nombre, email, ticket code, estado pago, check-in, fecha inscripción
  - Acción: "Check-in manual"
Button "Exportar lista"
```

**Tab Check-in:**
```
CheckinView
├── Contador en tiempo real: "42 / 100 asistentes"
├── Tabs: [QR Scanner | Búsqueda manual]
│
├── QR Scanner:
│   ├── QRReader (librería: html5-qrcode)
│   ├── Al leer código: POST /events/:id/checkin { ticketCode }
│   └── Feedback visual: verde (✓ nombre) | rojo (error/ya hizo checkin)
│
└── Búsqueda manual:
    ├── Input búsqueda por nombre o email
    └── Lista de resultados → click → check-in
```

**Tab Recaudación:** (solo si fundraisingEnabled)
```
DonationThermometer grande + tabla de donaciones del evento
```

---

### M04-04 — `/rifas`

**Lista de RaffleCard:**
```
├── Título
├── Progress: "250 / 500 boletos vendidos" (barra)
├── Precio por boleto
├── Fecha límite venta
├── Fecha sorteo
├── StatusBadge (DRAFT/ACTIVE/CLOSED/DRAWN)
└── Acciones: ver, editar, cerrar venta, sortear
```

---

### M04-05 — `/rifas/nueva` y `/rifas/:id/editar`

**Formulario:**
```
- title (Input, required)
- description (Textarea)
- prizes (Array dinámico de premios)
  Cada premio: { place: number, description: string, value: number }
  Button "+ Agregar premio"
- ticketPrice (CurrencyInput, required)
- totalTickets (Input numérico, required)
- maxPerPerson (Input numérico, opcional)
- saleEndDate (DateTimePicker, required)
- drawDate (DateTimePicker, required, > saleEndDate)
```

---

### M04-06 — `/rifas/:id`

**Tabs: Detalle | Boletos | Sorteo**

**Tab Detalle:** datos de la rifa + premios + progress de ventas

**Tab Boletos:**
```
KPIs: Vendidos | Disponibles | Recaudado
DataTable de tickets:
  - número, comprador, email, estado pago, código, fecha
  - Filtro: pagados / pendientes
```

**Tab Sorteo:**
```
[Si status != DRAWN]
  Button "Realizar sorteo" (solo Admin, solo si status=CLOSED)
  ConfirmDialog: "¿Confirmas ejecutar el sorteo? Esta acción no se puede deshacer."
  → POST /raffles/:id/draw

[Si status = DRAWN]
  Card con:
  - "¡Ganador!" + confetti animation
  - Número ganador (grande)
  - Nombre y email del ganador
  - Button "Descargar acta digital" → link a drawActUrl
```

---

## Reglas de negocio

1. Evento COMPLETED: no acepta nuevas inscripciones
2. Evento con capacity=null: inscripciones ilimitadas
3. Al alcanzar capacity: cerrar inscripciones automáticamente (job BullMQ)
4. Rifa: no se puede sortear si status != CLOSED
5. Rifa: solo se puede pasar a CLOSED manualmente o por fecha saleEndDate cumplida (job BullMQ)
6. Ticket: número único por rifa — generado al azar si el comprador no especifica
7. Boleto comprado y pagado: enviar por email (PDF con QR del ticketCode)

---

## i18n — claves

```json
{
  "events": {
    "title": "Eventos",
    "new": "Nuevo evento",
    "type": {
      "GENERAL": "General",
      "FUNDRAISING": "Recaudación",
      "ECOLOGY": "Ecológico",
      "SOCIAL": "Ayuda social",
      "TRAINING": "Capacitación",
      "MEETING": "Reunión"
    }
  },
  "raffles": {
    "title": "Rifas digitales",
    "new": "Nueva rifa",
    "draw": "Realizar sorteo"
  }
}
```
