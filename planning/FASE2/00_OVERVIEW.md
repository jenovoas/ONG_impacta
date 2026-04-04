# FASE 2 — Crecimiento
## Impacta+ SaaS (4-6 semanas, post Fase 1)

> **Prerrequisito:** Fase 1 completa y en producción con al menos 10 ONGs activas.
> **Principio:** No iniciar Fase 2 hasta tener feedback real de usuarios de Fase 1.

---

## Módulos

| ID | Módulo | Prioridad | Semanas |
|----|--------|-----------|---------|
| M09 | Transparencia y Rendición de Cuentas | Alta | 1-2 |
| M10 | Email Marketing y Comunicaciones | Media | 1-2 |
| M11 | Logística e Inventarios | Alta | 2-3 |
| M12 | Voluntariado Corporativo | Baja | 3-4 |
| M13 | Crowdfunding y Campañas Virales | Media | 3-4 |
| M14 | App Móvil (React Native + Expo) | Alta | 4-6 |
| M15 | i18n Completo | Media | paralelo |

---

## Dependencias entre módulos Fase 2

```
M09 Transparencia → depende de datos de M03 (donaciones) + M07 (contabilidad)
M10 Email Marketing → depende de M01 (socios/voluntarios como listas)
M11 Logística → depende de M05 (ayuda social usa los inventarios)
M12 Voluntariado Corp → depende de M01 (voluntarios) + M04 (eventos)
M13 Crowdfunding → depende de M03 (donaciones) + M04 (eventos)
M14 App Móvil → depende de toda la API de Fase 1 (consume mismos endpoints)
M15 i18n → paralelo, agrega claves a archivos existentes
```

---

## Cambios al schema Prisma en Fase 2

Agregar al `schema.prisma` de `packages/database`:

```prisma
// M10 — Email Marketing
model EmailCampaign {
  id             String   @id @default(cuid())
  organizationId String
  title          String
  subject        String
  content        String   // HTML
  targetSegment  String   // "all" | "members" | "volunteers" | "donors"
  status         String   @default("DRAFT") // DRAFT | SCHEDULED | SENT
  scheduledAt    DateTime?
  sentAt         DateTime?
  sentCount      Int      @default(0)
  openCount      Int      @default(0)
  clickCount     Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  organization   Organization @relation(fields: [organizationId], references: [id])
  @@map("email_campaigns")
}

// M11 — Logística
model Warehouse {
  id             String    @id @default(cuid())
  organizationId String
  name           String
  address        String?
  isActive       Boolean   @default(true)
  createdAt      DateTime  @default(now())
  organization   Organization @relation(fields: [organizationId], references: [id])
  items          InventoryItem[]
  @@map("warehouses")
}

model InventoryItem {
  id            String   @id @default(cuid())
  warehouseId   String
  name          String
  category      String
  unit          String   // "kg", "unidad", "caja"
  currentStock  Decimal  @default(0) @db.Decimal(10, 2)
  minStock      Decimal  @default(0) @db.Decimal(10, 2)
  expiresAt     DateTime?
  batchNumber   String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  warehouse     Warehouse @relation(fields: [warehouseId], references: [id])
  movements     StockMovement[]
  @@map("inventory_items")
}

model StockMovement {
  id          String   @id @default(cuid())
  itemId      String
  type        String   // IN | OUT | ADJUSTMENT
  quantity    Decimal  @db.Decimal(10, 2)
  reason      String?
  reference   String?  // N° entrega, N° donación en especie
  userId      String?
  createdAt   DateTime @default(now())
  item        InventoryItem @relation(fields: [itemId], references: [id])
  @@map("stock_movements")
}

// M12 — Voluntariado Corporativo
model CorporateProgram {
  id             String   @id @default(cuid())
  organizationId String
  companyName    String
  companyRut     String?
  contactName    String
  contactEmail   String
  volunteerCount Int      @default(0)
  status         String   @default("ACTIVE")
  createdAt      DateTime @default(now())
  organization   Organization @relation(fields: [organizationId], references: [id])
  @@map("corporate_programs")
}

// M13 — Crowdfunding
model CrowdfundingCampaign {
  id             String   @id @default(cuid())
  organizationId String
  campaignId     String   // referencia a DonationCampaign
  ambassadors    Json     @default("[]") // [{ userId, shareCount, raised }]
  shareUrl       String   @unique
  socialShares   Int      @default(0)
  createdAt      DateTime @default(now())
  organization   Organization @relation(fields: [organizationId], references: [id])
  @@map("crowdfunding_campaigns")
}
```

---

## Nuevas rutas API Fase 2

```
/email-campaigns          GET, POST
/email-campaigns/:id      GET, PATCH, DELETE
/email-campaigns/:id/send POST

/inventory/warehouses     GET, POST
/inventory/items          GET, POST
/inventory/items/:id      GET, PATCH
/inventory/items/:id/movements POST
/inventory/alerts         GET (stock bajo mínimo)

/corporate               GET, POST
/corporate/:id           GET, PATCH

/crowdfunding            GET, POST
/crowdfunding/:id        GET, PATCH
/crowdfunding/:id/share  POST (incrementa contador)

/transparency/:slug      GET (público, sin auth) → datos de transparencia de la ONG
```

---

## App Móvil (M14) — Stack exacto

```
apps/mobile/
Stack:
- React Native (sin Expo Go en producción, usar Expo EAS Build)
- Expo SDK 51+
- Expo Router v3 (file-based routing)
- TypeScript
- Zustand (mismo store que web, reutilizar lógica)
- TanStack Query (mismos hooks si se extraen a packages/queries)
- React Hook Form + Zod
- Expo SecureStore (tokens JWT)
- Expo Notifications + Firebase Cloud Messaging (push)
- Expo Location (GPS)
- Expo Camera + expo-barcode-scanner (QR check-in)
- Expo Image Picker
- react-i18next (mismo setup que web)
- NativeWind v4 (Tailwind para RN)

Pantallas Fase 2 app móvil:
- Login / 2FA
- Dashboard personal
- Mis tareas
- Calendario
- Mis eventos (inscripción + check-in QR)
- Registrar avistamiento de especie
- Registrar jornada ecológica
- Mi perfil + cuotas
- Notificaciones
```

---

## Criterios para iniciar Fase 2

- [ ] Fase 1 en producción > 30 días sin bugs críticos
- [ ] Al menos 10 ONGs activas con datos reales
- [ ] Feedback de usuarios recopilado (encuesta NPS > 40)
- [ ] Backlog de Fase 1 cerrado (0 bugs pendientes)
- [ ] Infraestructura estable (uptime 99.9% en los últimos 30 días)
