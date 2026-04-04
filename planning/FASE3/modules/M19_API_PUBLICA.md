# M19 — API Pública y Developer Portal
## FASE 3

---

## Responsabilidad única
API REST pública con autenticación por API Key para que terceros integren datos de la plataforma. Solo lectura en Fase 3 (escritura en v2 de la API pública si hay demanda).

---

## Backend
```
public-api/
├── public-api.module.ts
├── api-keys.controller.ts        ← /settings/api-keys (gestión de keys)
├── public.controller.ts          ← /api/public/v1/* (endpoints públicos)
├── api-keys.service.ts
└── api-key.guard.ts              ← AuthGuard basado en header X-API-Key
```

### Autenticación
```
Header: X-API-Key: impacta_live_xxxxxxxxxxxx

ApiKeyGuard:
1. Extraer key del header
2. Hash SHA-256 del key
3. Buscar en api_keys donde keyHash = hash AND isActive = true
4. Si expiresAt: verificar no vencido
5. Actualizar lastUsedAt
6. Inyectar organizationId en el request (como JWT)
```

### Endpoints públicos disponibles
```
GET /api/public/v1/members          socios (solo campos no sensibles)
GET /api/public/v1/events           eventos públicos
GET /api/public/v1/donations/stats  estadísticas agregadas
GET /api/public/v1/species          catálogo de especies
GET /api/public/v1/sightings        avistamientos
GET /api/public/v1/impact           métricas de impacto
```

---

## Frontend — `/configuracion/api`

```
ApiKeysPage
├── Descripción: "Integra datos de tu ONG con sistemas externos"
├── Button "Crear API Key"
└── DataTable de API Keys:
   | Nombre | Permisos | Último uso | Vence | Estado | Acciones |
   Acciones: copiar key (solo al crear), revocar

Sheet "Nueva API Key":
- name (Input: nombre descriptivo para identificar el uso)
- permissions (MultiCheckbox: members:read | events:read | donations:read | ...)
- expiresAt (DatePicker, opcional)
→ Al crear: mostrar el key UNA SOLA VEZ con botón "Copiar"
  "Esta es la única vez que verás este key. Guárdalo en un lugar seguro."
```

### Developer Portal (static site o página en docs/)
```
Documentación de la API pública:
- Autenticación
- Rate limits (100 req/min por key)
- Endpoints disponibles (Swagger embebido)
- Ejemplos de código (curl, JavaScript, Python)
- Webhooks disponibles (Fase futura)
```

---

## Reglas de negocio
1. El API Key se muestra completo solo al crear — después solo se ve los últimos 4 chars
2. El hash del key se guarda con SHA-256 (no reversible)
3. Rate limit: 100 req/min por API Key (ThrottlerGuard de NestJS)
4. Solo plan PRO y Enterprise tienen acceso a API pública
5. Al revocar: isActive=false, el key deja de funcionar inmediatamente
