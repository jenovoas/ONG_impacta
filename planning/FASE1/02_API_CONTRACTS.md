# FASE 1 — Contratos de API REST
## Impacta+ SaaS

> Base URL: `https://impacta.pinguinoseguro.cl/api/v1`
> Autenticación: `Authorization: Bearer <access_token>` en todos los endpoints protegidos
> Content-Type: `application/json`
> **NO inventar endpoints. Implementar exactamente los aquí definidos.**

---

## Convenciones

### Respuesta exitosa
```json
{
  "data": { },
  "meta": { "timestamp": "2026-04-04T12:00:00Z" }
}
```

### Respuesta paginada
```json
{
  "data": [],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

### Respuesta de error
```json
{
  "error": {
    "code": "MEMBER_NOT_FOUND",
    "message": "El socio no existe",
    "statusCode": 404,
    "details": []
  }
}
```

### Query params de paginación (aplica a todos los GET de lista)
```
?page=1&limit=20&search=texto&sortBy=createdAt&sortOrder=desc
```

---

## M00 — Autenticación (`/auth`)

### POST `/auth/register-org`
Registro de nueva ONG. Público.
```json
// Request
{
  "orgName": "string",
  "orgSlug": "string",         // único, URL-friendly
  "orgRut": "string|null",
  "orgEmail": "string",
  "adminName": "string",
  "adminEmail": "string",
  "adminPassword": "string",   // mín 8 chars, 1 mayúscula, 1 número
  "plan": "FREE"               // siempre FREE al registrar
}

// Response 201
{
  "data": {
    "organizationId": "string",
    "message": "Revisa tu email para verificar tu cuenta"
  }
}
```

### POST `/auth/login`
```json
// Request
{ "email": "string", "password": "string" }

// Response 200 (sin 2FA)
{
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": 900,
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "systemRole": "ADMIN_ONG",
      "organizationId": "string",
      "organizationName": "string",
      "organizationSlug": "string",
      "avatarUrl": "string|null"
    }
  }
}

// Response 200 (con 2FA activo)
{
  "data": {
    "requires2FA": true,
    "tempToken": "string"       // token temporal para completar 2FA
  }
}
```

### POST `/auth/2fa/verify`
```json
// Request
{ "tempToken": "string", "code": "string" }  // code = 6 dígitos TOTP

// Response 200 — mismo shape que login exitoso
```

### POST `/auth/refresh`
```json
// Request
{ "refreshToken": "string" }

// Response 200
{
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": 900
  }
}
```

### POST `/auth/logout`
Requiere Bearer token.
```json
// Request
{ "refreshToken": "string" }

// Response 200
{ "data": { "message": "Sesión cerrada" } }
```

### POST `/auth/forgot-password`
```json
// Request
{ "email": "string" }

// Response 200 (siempre, no revelar si existe)
{ "data": { "message": "Si el email existe, recibirás instrucciones" } }
```

### POST `/auth/reset-password`
```json
// Request
{ "token": "string", "password": "string" }

// Response 200
{ "data": { "message": "Contraseña actualizada" } }
```

### GET `/auth/me`
Requiere Bearer token.
```json
// Response 200
{
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "avatarUrl": "string|null",
    "systemRole": "string",
    "permissions": ["members:read", "events:write"],
    "organization": {
      "id": "string",
      "name": "string",
      "slug": "string",
      "plan": "PRO",
      "logoUrl": "string|null"
    }
  }
}
```

---

## M01 — Socios (`/members`)

### GET `/members`
```
Query: page, limit, search, status (ACTIVE|INACTIVE|SUSPENDED), cargo
```
```json
// Response 200
{
  "data": [{
    "id": "string",
    "memberNumber": "string",
    "name": "string",
    "email": "string",
    "phone": "string|null",
    "status": "ACTIVE",
    "cargo": "string|null",
    "membershipType": "string|null",
    "monthlyFee": 5000,
    "memberSince": "2024-01-15T00:00:00Z",
    "currentMonthPaid": true
  }],
  "meta": { "total": 150, "page": 1, "limit": 20, "totalPages": 8 }
}
```

### GET `/members/:id`
```json
// Response 200
{
  "data": {
    "id": "string",
    "memberNumber": "string",
    "name": "string",
    "email": "string",
    "phone": "string|null",
    "rut": "string|null",
    "address": "string|null",
    "city": "string|null",
    "region": "string|null",
    "birthDate": "string|null",
    "memberSince": "string",
    "status": "ACTIVE",
    "membershipType": "string|null",
    "cargo": "string|null",
    "monthlyFee": 5000,
    "notes": "string|null",
    "avatarUrl": "string|null",
    "userId": "string|null",
    "payments": [{
      "id": "string",
      "period": "2026-04",
      "amount": 5000,
      "status": "PAID",
      "paidAt": "string|null"
    }],
    "recentEvents": [{
      "id": "string",
      "title": "string",
      "date": "string"
    }]
  }
}
```

### POST `/members`
```json
// Request
{
  "name": "string",            // requerido
  "email": "string",           // requerido, único en la ONG
  "rut": "string|null",
  "phone": "string|null",
  "address": "string|null",
  "city": "string|null",
  "region": "string|null",
  "birthDate": "string|null",  // ISO 8601
  "membershipType": "string|null",
  "cargo": "string|null",
  "monthlyFee": 0,
  "memberSince": "string|null", // default: hoy
  "notes": "string|null",
  "createUserAccount": false    // si true, enviar invitación por email
}

// Response 201
{ "data": { "id": "string", ...camposCompletos } }
```

### PATCH `/members/:id`
```json
// Request — solo los campos a actualizar
{
  "name": "string?",
  "phone": "string?",
  "status": "ACTIVE|INACTIVE|SUSPENDED|DECEASED?",
  "cargo": "string?",
  "monthlyFee": "number?",
  "notes": "string?"
}

// Response 200
{ "data": { ...miembroActualizado } }
```

### DELETE `/members/:id`
Soft delete — cambia status a INACTIVE.
```json
// Response 200
{ "data": { "message": "Socio desactivado" } }
```

### GET `/members/:id/payment-status`
Estado de cuotas del socio.
```json
// Response 200
{
  "data": {
    "memberId": "string",
    "monthlyFee": 5000,
    "currentPeriod": "2026-04",
    "currentStatus": "PENDING",
    "overdueMonths": ["2026-02", "2026-03"],
    "totalDebt": 10000,
    "payments": [{ "period": "string", "status": "string", "paidAt": "string|null" }]
  }
}
```

### POST `/members/:id/payments`
Registrar pago de cuota.
```json
// Request
{
  "period": "2026-04",         // YYYY-MM
  "amount": 5000,
  "method": "CASH",
  "notes": "string|null"
}

// Response 201
{ "data": { "id": "string", "period": "string", "status": "PAID", "paidAt": "string" } }
```

---

## M01b — Voluntarios (`/volunteers`)

### GET `/volunteers`
```
Query: page, limit, search, status, skills (array), areas (array)
```

### GET `/volunteers/:id`

### POST `/volunteers`
```json
{
  "name": "string",
  "email": "string",
  "rut": "string|null",
  "phone": "string|null",
  "skills": ["string"],
  "availability": { "mon": true, "tue": true, "wed": false, "thu": true, "fri": false, "sat": true, "sun": false },
  "areas": ["ecologia", "ayuda_social"],
  "notes": "string|null"
}
```

### PATCH `/volunteers/:id`
### DELETE `/volunteers/:id`

---

## M02 — Tareas y Calendario (`/tasks`, `/calendar`)

### GET `/tasks`
```
Query: page, limit, status, priority, assigneeId, dueBefore, dueAfter
```
```json
// Response 200
{
  "data": [{
    "id": "string",
    "title": "string",
    "status": "PENDING",
    "priority": "HIGH",
    "assignee": { "id": "string", "name": "string", "avatarUrl": "string|null" },
    "dueDate": "string|null",
    "tags": ["string"],
    "subtasksCount": 2,
    "completedSubtasksCount": 1
  }]
}
```

### GET `/tasks/:id`
Incluye comments y subtasks.

### POST `/tasks`
```json
{
  "title": "string",
  "description": "string|null",
  "priority": "MEDIUM",
  "assigneeId": "string|null",
  "dueDate": "string|null",
  "isRecurring": false,
  "recurringRule": "string|null",   // RRULE: "FREQ=WEEKLY;BYDAY=MO,WE"
  "parentTaskId": "string|null",
  "tags": []
}
```

### PATCH `/tasks/:id`
### DELETE `/tasks/:id`

### POST `/tasks/:id/comments`
```json
{ "content": "string" }
```

### PATCH `/tasks/:id/status`
```json
{ "status": "IN_PROGRESS|COMPLETED|CANCELLED" }
```

### GET `/calendar/events`
Vista unificada del calendario (tareas + eventos).
```
Query: start=ISO8601&end=ISO8601
```
```json
// Response 200
{
  "data": {
    "tasks": [{ "id": "string", "title": "string", "start": "string", "end": "string|null", "type": "task", "status": "string", "priority": "string" }],
    "events": [{ "id": "string", "title": "string", "start": "string", "end": "string|null", "type": "event", "status": "string" }]
  }
}
```

---

## M03 — Donaciones y Campañas (`/donations`, `/campaigns`)

### GET `/campaigns`
### GET `/campaigns/:id`
Incluye total recaudado y porcentaje de meta.

### POST `/campaigns`
```json
{
  "title": "string",
  "description": "string|null",
  "goal": 1000000,
  "currency": "CLP",
  "startDate": "string",
  "endDate": "string|null",
  "isPublic": true
}
```

### PATCH `/campaigns/:id`
### DELETE `/campaigns/:id`

### GET `/donations`
```
Query: page, limit, campaignId, status, method, dateFrom, dateTo, type
```

### GET `/donations/:id`
### GET `/donations/stats`
Resumen estadístico del período.
```
Query: dateFrom, dateTo, campaignId
```
```json
// Response 200
{
  "data": {
    "totalAmount": 5000000,
    "totalCount": 87,
    "avgAmount": 57471,
    "byMethod": { "MERCADOPAGO": 3000000, "TRANSFER": 2000000 },
    "byFrequency": { "ONE_TIME": 4000000, "MONTHLY": 1000000 },
    "dailySeries": [{ "date": "2026-04-01", "amount": 150000, "count": 3 }]
  }
}
```

### POST `/donations`
Registro de donación manual (interna).
```json
{
  "campaignId": "string|null",
  "memberId": "string|null",
  "donorName": "string",
  "donorEmail": "string",
  "donorRut": "string|null",
  "amount": 50000,
  "currency": "CLP",
  "type": "MONETARY",
  "frequency": "ONE_TIME",
  "method": "TRANSFER",
  "notes": "string|null",
  "paidAt": "string"            // fecha efectiva del pago
}
```

### POST `/donations/checkout`
Crear sesión de pago en pasarela.
```json
// Request
{
  "campaignId": "string|null",
  "donorName": "string",
  "donorEmail": "string",
  "donorRut": "string|null",
  "amount": 10000,
  "currency": "CLP",
  "frequency": "ONE_TIME",
  "method": "MERCADOPAGO",      // MERCADOPAGO | PAYPAL | STRIPE
  "successUrl": "string",
  "cancelUrl": "string"
}

// Response 200
{
  "data": {
    "donationId": "string",
    "checkoutUrl": "string",    // URL de la pasarela
    "externalId": "string"
  }
}
```

### POST `/donations/webhook/mercadopago`
### POST `/donations/webhook/stripe`
### POST `/donations/webhook/paypal`
Endpoints públicos para webhooks de pasarelas. Verifican firma antes de procesar.

### GET `/donations/:id/certificate`
Genera y retorna URL del certificado PDF de donación.
```json
// Response 200
{ "data": { "certificateUrl": "string" } }
```

---

## M04 — Eventos (`/events`)

### GET `/events`
```
Query: page, limit, status, type, dateFrom, dateTo
```

### GET `/events/:id`
Incluye registrations count y recaudación actual.

### POST `/events`
```json
{
  "title": "string",
  "description": "string|null",
  "type": "GENERAL",
  "startDate": "string",
  "endDate": "string|null",
  "location": "string|null",
  "address": "string|null",
  "lat": null,
  "lng": null,
  "capacity": null,
  "isPublic": true,
  "price": null,
  "currency": "CLP",
  "fundraisingEnabled": false,
  "fundraisingGoal": null,
  "campaignId": "string|null"
}
```

### PATCH `/events/:id`
### PATCH `/events/:id/status`
```json
{ "status": "PUBLISHED|CANCELLED|COMPLETED" }
```

### GET `/events/:id/registrations`
Lista de inscriptos.

### POST `/events/:id/registrations`
Inscripción pública (sin autenticación si el evento es público).
```json
{
  "name": "string",
  "email": "string",
  "phone": "string|null",
  "memberId": "string|null"
}
```

### POST `/events/:id/checkin`
Check-in por código QR o búsqueda.
```json
{ "ticketCode": "string" }
// ó
{ "email": "string" }

// Response 200
{
  "data": {
    "name": "string",
    "checkedIn": true,
    "checkedInAt": "string",
    "alreadyCheckedIn": false   // true si ya hizo check-in antes
  }
}
```

---

## M05 — Rifas (`/raffles`)

### GET `/raffles`
### GET `/raffles/:id`
Incluye tickets vendidos y disponibles.

### POST `/raffles`
```json
{
  "title": "string",
  "description": "string|null",
  "prizes": [{ "place": 1, "description": "string", "value": 1000000 }],
  "ticketPrice": 2000,
  "currency": "CLP",
  "totalTickets": 500,
  "maxPerPerson": 10,
  "saleEndDate": "string",
  "drawDate": "string"
}
```

### PATCH `/raffles/:id`
### PATCH `/raffles/:id/status`
```json
{ "status": "ACTIVE|CLOSED|CANCELLED" }
```

### GET `/raffles/:id/tickets`
```
Query: page, limit, status, buyerEmail
```

### POST `/raffles/:id/tickets`
Venta de boleto (checkout).
```json
{
  "numbers": [42, 87, 156],      // números seleccionados, [] = aleatorio
  "buyerName": "string",
  "buyerEmail": "string",
  "buyerPhone": "string|null",
  "buyerRut": "string|null",
  "method": "MERCADOPAGO"
}
```

### POST `/raffles/:id/draw`
Ejecutar el sorteo. Solo Admin.
```json
// Response 200
{
  "data": {
    "winner": {
      "ticketId": "string",
      "number": 42,
      "buyerName": "string",
      "buyerEmail": "string"
    },
    "drawActUrl": "string"       // PDF del acta generado
  }
}
```

---

## M06 — Ayuda Social (`/social-aid`)

### GET `/social-aid/beneficiaries`
### GET `/social-aid/beneficiaries/:id`
### POST `/social-aid/beneficiaries`
```json
{
  "name": "string",
  "rut": "string|null",
  "email": "string|null",
  "phone": "string|null",
  "address": "string|null",
  "city": "string|null",
  "lat": null,
  "lng": null,
  "familySize": null,
  "situation": "string|null",
  "aidTypes": ["FOOD", "MEDICINE"],
  "notes": "string|null"
}
```
### PATCH `/social-aid/beneficiaries/:id`

### POST `/social-aid/beneficiaries/:id/deliveries`
```json
{
  "type": "FOOD",
  "description": "Canasta familiar — 15 kg",
  "quantity": "1 canasta",
  "estimatedValue": 25000,
  "deliveredById": "string|null",
  "notes": "string|null"
  // signatureUrl y photoUrls se suben por separado via /uploads
}
```

### GET `/social-aid/beneficiaries/:id/deliveries`
### GET `/social-aid/map`
Todos los beneficiarios geolocalizados.
```json
// Response 200
{
  "data": [{
    "id": "string",
    "name": "string",
    "lat": -33.45,
    "lng": -70.67,
    "aidTypes": ["FOOD"],
    "status": "ACTIVE"
  }]
}
```

---

## M07 — Ecología (`/ecology`)

### GET `/ecology/projects`
### GET `/ecology/projects/:id`
### POST `/ecology/projects`
```json
{
  "title": "string",
  "description": "string|null",
  "type": "REFORESTATION",
  "location": "string|null",
  "lat": null,
  "lng": null,
  "startDate": "string",
  "endDate": "string|null"
}
```
### PATCH `/ecology/projects/:id`

### GET `/ecology/projects/:id/activities`
### POST `/ecology/projects/:id/activities`
```json
{
  "title": "string",
  "description": "string|null",
  "date": "string",
  "participants": 0,
  "metrics": {
    "trees_planted": 0,
    "waste_kg": 0,
    "area_m2": 0,
    "native_species": 0
  },
  "notes": "string|null"
}
```

---

## M08 — Especies (`/species`)

### GET `/species`
```
Query: page, limit, search, category, conservationStatus, isNative
```

### GET `/species/:id`
Incluye últimos 10 avistamientos y evolución de población.

### POST `/species`
```json
{
  "commonName": "string",
  "scientificName": "string",
  "family": "string|null",
  "order": "string|null",
  "kingdom": "string|null",
  "category": "FLORA",
  "conservationStatus": "LEAST_CONCERN",
  "description": "string|null",
  "habitat": "string|null",
  "distribution": "string|null",
  "characteristics": "string|null",
  "isNative": true
}
```

### PATCH `/species/:id`

### GET `/species/sightings`
Todos los avistamientos (para mapa global).
```
Query: speciesId, dateFrom, dateTo, bbox (lat1,lng1,lat2,lng2)
```

### POST `/species/:id/sightings`
```json
{
  "lat": -33.45,
  "lng": -70.67,
  "locationDesc": "string|null",
  "count": 1,
  "ageStage": "adult",
  "healthStatus": "string|null",
  "condition": "string|null",
  "notes": "string|null",
  "sightedAt": "string"
}
```

### GET `/species/:id/population`
Serie temporal de registros de población.

### POST `/species/:id/population`
```json
{
  "date": "string",
  "count": 15,
  "location": "string|null",
  "method": "census",
  "notes": "string|null"
}
```

---

## M09 — Contabilidad (`/accounting`)

### GET `/accounting/accounts`
Plan de cuentas en árbol.

### POST `/accounting/accounts`
```json
{
  "code": "1.1.01.001",
  "name": "Caja chica",
  "type": "ASSET",
  "parentId": "string|null",
  "allowsEntries": true,
  "description": "string|null"
}
```

### PATCH `/accounting/accounts/:id`

### GET `/accounting/journal`
Libro diario.
```
Query: page, limit, dateFrom, dateTo, status, search
```

### GET `/accounting/journal/:id`
Asiento con todas sus líneas.

### POST `/accounting/journal`
```json
{
  "date": "string",
  "description": "string",
  "costCenter": "string|null",
  "reference": "string|null",
  "lines": [
    { "accountId": "string", "description": "string|null", "debit": 50000, "credit": 0 },
    { "accountId": "string", "description": "string|null", "debit": 0, "credit": 50000 }
  ]
}
// Validar: sum(debit) === sum(credit), mínimo 2 líneas
```

### PATCH `/accounting/journal/:id/post`
Contabilizar asiento (DRAFT → POSTED). No editable después.

### GET `/accounting/ledger`
Libro mayor por cuenta.
```
Query: accountId (requerido), dateFrom, dateTo
```

### GET `/accounting/trial-balance`
Balance de comprobación.
```
Query: dateFrom, dateTo
```
```json
// Response 200
{
  "data": {
    "accounts": [{
      "code": "string",
      "name": "string",
      "type": "ASSET",
      "totalDebit": 1000000,
      "totalCredit": 500000,
      "balance": 500000
    }],
    "totals": { "debit": 5000000, "credit": 5000000 }
  }
}
```

### GET `/accounting/balance-sheet`
Balance general (activos, pasivos, patrimonio).

### GET `/accounting/income-statement`
Estado de resultados.

---

## M10 — Reportes (`/reports`)

### GET `/reports/members`
```
Query: dateFrom, dateTo, format (json|csv|pdf)
```

### GET `/reports/donations`
### GET `/reports/events`
### GET `/reports/impact`
Reporte de impacto general.

---

## Utilidades — Uploads (`/uploads`)

### POST `/uploads/image`
Multipart form-data. Sube imagen y retorna URL.
```
Field: file (image/jpeg, image/png, image/webp, max 5MB)

// Response 201
{ "data": { "url": "string", "key": "string" } }
```

### POST `/uploads/document`
```
Field: file (application/pdf, max 10MB)
```

### DELETE `/uploads`
```json
{ "key": "string" }
```

---

## Configuración ONG (`/settings`)

### GET `/settings`
Configuración completa de la ONG.

### PATCH `/settings`
```json
{
  "name": "string?",
  "legalName": "string?",
  "rut": "string?",
  "email": "string?",
  "phone": "string?",
  "address": "string?",
  "city": "string?",
  "region": "string?"
}
```

### PATCH `/settings/logo`
```json
{ "logoUrl": "string" }
```

### GET `/settings/users`
Gestión de usuarios de la ONG.

### POST `/settings/users/invite`
```json
{
  "email": "string",
  "name": "string",
  "systemRole": "COORDINATOR"
}
```

### PATCH `/settings/users/:id/role`
```json
{ "systemRole": "string", "customRoleId": "string|null" }
```

### DELETE `/settings/users/:id`

---

## Super Admin (`/admin`) — Solo SystemRole = SUPER_ADMIN

### GET `/admin/organizations`
### GET `/admin/organizations/:id`
### PATCH `/admin/organizations/:id/plan`
```json
{ "plan": "PRO", "planExpiresAt": "string|null" }
```
### PATCH `/admin/organizations/:id/status`
```json
{ "isActive": false }
```
### GET `/admin/stats`
Métricas globales de la plataforma.

---

## Códigos de error estándar

| Código | HTTP | Descripción |
|--------|------|-------------|
| `UNAUTHORIZED` | 401 | Token inválido o expirado |
| `FORBIDDEN` | 403 | Sin permisos para esta acción |
| `NOT_FOUND` | 404 | Recurso no encontrado |
| `CONFLICT` | 409 | Conflicto (email duplicado, etc.) |
| `VALIDATION_ERROR` | 422 | Datos inválidos (incluye `details[]`) |
| `PLAN_LIMIT_EXCEEDED` | 402 | Límite del plan alcanzado |
| `PAYMENT_FAILED` | 402 | Error en pasarela de pago |
| `INTERNAL_ERROR` | 500 | Error interno del servidor |

---

## Rate Limiting (aplicado en Nginx + NestJS Throttler)

| Endpoint | Límite |
|----------|--------|
| `POST /auth/login` | 10 req / 1 min por IP |
| `POST /auth/forgot-password` | 3 req / 1 hora por IP |
| `POST /donations/webhook/*` | Sin límite (verifican firma HMAC) |
| Resto de la API | 60 req / 1 min por usuario |
