# FASE 1 — Schema de Base de Datos (Prisma)
## Impacta+ SaaS

> Archivo: `packages/database/prisma/schema.prisma`
> Motor: PostgreSQL 16 con Row-Level Security (RLS)
> **Copiar exactamente. No agregar campos no especificados.**

---

## Archivo completo `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────

enum Plan {
  FREE
  BASIC
  PRO
  ENTERPRISE
}

enum SystemRole {
  SUPER_ADMIN
  ADMIN_ONG
  COORDINATOR
  VOLUNTEER
  MEMBER
  DONOR
}

enum MemberStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  DECEASED
}

enum VolunteerStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum PaymentStatus {
  PENDING
  PAID
  OVERDUE
  CANCELLED
  REFUNDED
}

enum PaymentMethod {
  CASH
  TRANSFER
  MERCADOPAGO
  PAYPAL
  STRIPE
  CHECK
  OTHER
}

enum DonationType {
  MONETARY
  IN_KIND
}

enum DonationFrequency {
  ONE_TIME
  MONTHLY
  ANNUAL
}

enum EventType {
  GENERAL
  FUNDRAISING
  ECOLOGY
  SOCIAL
  TRAINING
  MEETING
}

enum EventStatus {
  DRAFT
  PUBLISHED
  CANCELLED
  COMPLETED
}

enum RaffleStatus {
  DRAFT
  ACTIVE
  CLOSED
  DRAWN
  CANCELLED
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum BeneficiaryStatus {
  ACTIVE
  INACTIVE
  GRADUATED
}

enum EcologyType {
  REFORESTATION
  CLEANUP
  CONSERVATION
  MONITORING
  EDUCATION
}

enum ProjectStatus {
  ACTIVE
  COMPLETED
  SUSPENDED
  CANCELLED
}

enum SpeciesCategory {
  FLORA
  FAUNA_MAMMAL
  FAUNA_BIRD
  FAUNA_REPTILE
  FAUNA_AMPHIBIAN
  FAUNA_FISH
  FAUNA_INSECT
  FAUNA_OTHER
}

enum ConservationStatus {
  EXTINCT
  EXTINCT_IN_WILD
  CRITICALLY_ENDANGERED
  ENDANGERED
  VULNERABLE
  NEAR_THREATENED
  LEAST_CONCERN
  DATA_DEFICIENT
}

enum AccountType {
  ASSET       // Activo
  LIABILITY   // Pasivo
  EQUITY      // Patrimonio
  REVENUE     // Ingreso
  EXPENSE     // Gasto
}

enum EntryStatus {
  DRAFT
  POSTED
  REVERSED
}

enum AidType {
  FOOD
  CLOTHES
  MEDICINE
  EDUCATION
  HOUSING
  ECONOMIC
  OTHER
}

// ─────────────────────────────────────────────────────────
// MULTI-TENANCY — Organización (Tenant)
// ─────────────────────────────────────────────────────────

model Organization {
  id              String    @id @default(cuid())
  name            String
  slug            String    @unique                // URL-friendly: "ong-impacta"
  legalName       String?                          // Razón social
  rut             String?                          // RUT chileno: "12.345.678-9"
  email           String
  phone           String?
  address         String?
  city            String?
  region          String?
  country         String    @default("CL")
  logoUrl         String?
  website         String?
  description     String?
  plan            Plan      @default(FREE)
  planExpiresAt   DateTime?
  isActive        Boolean   @default(true)
  isVerified      Boolean   @default(false)
  settings        Json      @default("{}")         // configuración UI, notificaciones, etc.
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  users           User[]
  members         Member[]
  volunteers      Volunteer[]
  customRoles     CustomRole[]
  events          Event[]
  campaigns       DonationCampaign[]
  donations       Donation[]
  raffles         Raffle[]
  tasks           Task[]
  beneficiaries   SocialBeneficiary[]
  ecologyProjects EcologyProject[]
  species         Species[]
  accounts        Account[]
  journalEntries  JournalEntry[]
  auditLogs       AuditLog[]

  @@index([slug])
  @@map("organizations")
}

// ─────────────────────────────────────────────────────────
// AUTENTICACIÓN Y USUARIOS
// ─────────────────────────────────────────────────────────

model User {
  id               String     @id @default(cuid())
  organizationId   String
  email            String
  passwordHash     String
  name             String
  avatarUrl        String?
  systemRole       SystemRole @default(VOLUNTEER)
  customRoleId     String?
  isActive         Boolean    @default(true)
  emailVerified    Boolean    @default(false)
  emailVerifyToken String?
  twoFactorSecret  String?
  twoFactorEnabled Boolean    @default(false)
  lastLoginAt      DateTime?
  lastLoginIp      String?
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt

  organization     Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  customRole       CustomRole?  @relation(fields: [customRoleId], references: [id])
  member           Member?
  volunteer        Volunteer?
  refreshTokens    RefreshToken[]
  assignedTasks    Task[]       @relation("TaskAssignee")
  createdTasks     Task[]       @relation("TaskCreator")
  taskComments     TaskComment[]
  auditLogs        AuditLog[]

  @@unique([organizationId, email])
  @@index([organizationId])
  @@map("users")
}

model RefreshToken {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([token])
  @@map("refresh_tokens")
}

model CustomRole {
  id             String   @id @default(cuid())
  organizationId String
  name           String
  description    String?
  permissions    String[]                           // ["members:read", "events:write", ...]
  isDefault      Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  users          User[]

  @@unique([organizationId, name])
  @@map("custom_roles")
}

// ─────────────────────────────────────────────────────────
// SOCIOS (MEMBERS)
// ─────────────────────────────────────────────────────────

model Member {
  id             String       @id @default(cuid())
  organizationId String
  userId         String?      @unique                // null si no tiene cuenta
  rut            String?
  name           String
  email          String
  phone          String?
  address        String?
  city           String?
  region         String?
  birthDate      DateTime?
  memberSince    DateTime     @default(now())
  memberNumber   String?                             // número correlativo por ONG
  status         MemberStatus @default(ACTIVE)
  membershipType String?                             // "activo", "honorario", "fundador"
  monthlyFee     Decimal      @default(0) @db.Decimal(10, 2)
  cargo          String?                             // "Presidente", "Tesorero", etc.
  notes          String?
  avatarUrl      String?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  organization        Organization        @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user                User?               @relation(fields: [userId], references: [id])
  memberPayments      MemberPayment[]
  eventRegistrations  EventRegistration[]
  donations           Donation[]          @relation("MemberDonations")

  @@unique([organizationId, email])
  @@unique([organizationId, memberNumber])
  @@index([organizationId, status])
  @@map("members")
}

model MemberPayment {
  id          String        @id @default(cuid())
  memberId    String
  amount      Decimal       @db.Decimal(10, 2)
  currency    String        @default("CLP")
  period      String                               // "2026-04" (YYYY-MM)
  status      PaymentStatus @default(PENDING)
  method      PaymentMethod?
  externalId  String?                              // ID en pasarela de pago
  receiptUrl  String?
  paidAt      DateTime?
  notes       String?
  createdAt   DateTime      @default(now())

  member      Member @relation(fields: [memberId], references: [id], onDelete: Cascade)

  @@unique([memberId, period])
  @@index([memberId])
  @@map("member_payments")
}

// ─────────────────────────────────────────────────────────
// VOLUNTARIOS
// ─────────────────────────────────────────────────────────

model Volunteer {
  id             String          @id @default(cuid())
  organizationId String
  userId         String?         @unique
  rut            String?
  name           String
  email          String
  phone          String?
  address        String?
  city           String?
  birthDate      DateTime?
  skills         String[]                           // ["primeros_auxilios", "conduccion", ...]
  availability   Json            @default("{}")     // { mon: true, tue: false, hours: "9-18" }
  areas          String[]                           // ["ecologia", "ayuda_social", ...]
  status         VolunteerStatus @default(ACTIVE)
  joinedAt       DateTime        @default(now())
  notes          String?
  avatarUrl      String?
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user           User?        @relation(fields: [userId], references: [id])

  @@unique([organizationId, email])
  @@index([organizationId, status])
  @@map("volunteers")
}

// ─────────────────────────────────────────────────────────
// TAREAS Y CALENDARIO
// ─────────────────────────────────────────────────────────

model Task {
  id             String       @id @default(cuid())
  organizationId String
  title          String
  description    String?
  status         TaskStatus   @default(PENDING)
  priority       TaskPriority @default(MEDIUM)
  assigneeId     String?
  createdById    String
  dueDate        DateTime?
  completedAt    DateTime?
  isRecurring    Boolean      @default(false)
  recurringRule  String?                            // RRULE string: "FREQ=WEEKLY;BYDAY=MO"
  parentTaskId   String?
  tags           String[]
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  organization   Organization  @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  assignee       User?         @relation("TaskAssignee", fields: [assigneeId], references: [id])
  createdBy      User          @relation("TaskCreator", fields: [createdById], references: [id])
  parent         Task?         @relation("SubTask", fields: [parentTaskId], references: [id])
  subtasks       Task[]        @relation("SubTask")
  comments       TaskComment[]

  @@index([organizationId, status])
  @@index([assigneeId])
  @@map("tasks")
}

model TaskComment {
  id        String   @id @default(cuid())
  taskId    String
  userId    String
  content   String
  createdAt DateTime @default(now())

  task      Task @relation(fields: [taskId], references: [id], onDelete: Cascade)
  user      User @relation(fields: [userId], references: [id])

  @@index([taskId])
  @@map("task_comments")
}

// ─────────────────────────────────────────────────────────
// DONACIONES Y CAMPAÑAS
// ─────────────────────────────────────────────────────────

model DonationCampaign {
  id             String    @id @default(cuid())
  organizationId String
  title          String
  description    String?
  goal           Decimal   @db.Decimal(12, 2)
  currency       String    @default("CLP")
  startDate      DateTime  @default(now())
  endDate        DateTime?
  imageUrl       String?
  isActive       Boolean   @default(true)
  isPublic       Boolean   @default(true)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  donations      Donation[]
  events         Event[]

  @@index([organizationId, isActive])
  @@map("donation_campaigns")
}

model Donation {
  id              String            @id @default(cuid())
  organizationId  String
  campaignId      String?
  memberId        String?
  donorName       String
  donorEmail      String
  donorRut        String?                          // para certificado tributario
  donorPhone      String?
  amount          Decimal           @db.Decimal(12, 2)
  currency        String            @default("CLP")
  type            DonationType      @default(MONETARY)
  frequency       DonationFrequency @default(ONE_TIME)
  method          PaymentMethod
  status          PaymentStatus     @default(PENDING)
  externalId      String?                          // ID en MercadoPago/Stripe/PayPal
  externalStatus  String?
  webhookData     Json?
  isAnonymous     Boolean           @default(false)
  inKindDesc      String?                          // descripción si es especie
  inKindValue     Decimal?          @db.Decimal(12, 2)
  certificateUrl  String?
  notes           String?
  paidAt          DateTime?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  organization    Organization      @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  campaign        DonationCampaign? @relation(fields: [campaignId], references: [id])
  member          Member?           @relation("MemberDonations", fields: [memberId], references: [id])

  @@index([organizationId, status])
  @@index([organizationId, campaignId])
  @@index([donorEmail])
  @@map("donations")
}

// ─────────────────────────────────────────────────────────
// EVENTOS
// ─────────────────────────────────────────────────────────

model Event {
  id                  String      @id @default(cuid())
  organizationId      String
  campaignId          String?
  title               String
  description         String?
  type                EventType   @default(GENERAL)
  status              EventStatus @default(DRAFT)
  startDate           DateTime
  endDate             DateTime?
  location            String?
  address             String?
  lat                 Float?
  lng                 Float?
  capacity            Int?
  isPublic            Boolean     @default(true)
  imageUrl            String?
  price               Decimal?    @db.Decimal(10, 2)
  currency            String      @default("CLP")
  fundraisingEnabled  Boolean     @default(false)
  fundraisingGoal     Decimal?    @db.Decimal(12, 2)
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt

  organization        Organization      @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  campaign            DonationCampaign? @relation(fields: [campaignId], references: [id])
  registrations       EventRegistration[]

  @@index([organizationId, status])
  @@index([organizationId, startDate])
  @@map("events")
}

model EventRegistration {
  id           String        @id @default(cuid())
  eventId      String
  memberId     String?
  name         String
  email        String
  phone        String?
  ticketCode   String        @unique @default(cuid())
  checkedIn    Boolean       @default(false)
  checkedInAt  DateTime?
  amount       Decimal?      @db.Decimal(10, 2)
  currency     String        @default("CLP")
  status       PaymentStatus @default(PENDING)
  externalId   String?
  paidAt       DateTime?
  createdAt    DateTime      @default(now())

  event        Event  @relation(fields: [eventId], references: [id], onDelete: Cascade)
  member       Member? @relation(fields: [memberId], references: [id])

  @@index([eventId])
  @@index([ticketCode])
  @@map("event_registrations")
}

// ─────────────────────────────────────────────────────────
// RIFAS DIGITALES
// ─────────────────────────────────────────────────────────

model Raffle {
  id              String       @id @default(cuid())
  organizationId  String
  title           String
  description     String?
  prizes          Json                               // [{ place: 1, description: "Auto", value: 5000000 }]
  ticketPrice     Decimal      @db.Decimal(10, 2)
  currency        String       @default("CLP")
  totalTickets    Int
  soldTickets     Int          @default(0)
  maxPerPerson    Int?
  status          RaffleStatus @default(DRAFT)
  saleEndDate     DateTime
  drawDate        DateTime
  winnerTicketId  String?
  drawActUrl      String?                            // PDF del acta de sorteo
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  organization    Organization  @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  tickets         RaffleTicket[]

  @@index([organizationId, status])
  @@map("raffles")
}

model RaffleTicket {
  id          String        @id @default(cuid())
  raffleId    String
  number      Int
  buyerName   String
  buyerEmail  String
  buyerPhone  String?
  buyerRut    String?
  amount      Decimal       @db.Decimal(10, 2)
  currency    String        @default("CLP")
  status      PaymentStatus @default(PENDING)
  externalId  String?
  ticketCode  String        @unique @default(cuid())
  isWinner    Boolean       @default(false)
  paidAt      DateTime?
  createdAt   DateTime      @default(now())

  raffle      Raffle @relation(fields: [raffleId], references: [id], onDelete: Cascade)

  @@unique([raffleId, number])
  @@index([raffleId])
  @@index([ticketCode])
  @@map("raffle_tickets")
}

// ─────────────────────────────────────────────────────────
// AYUDA SOCIAL
// ─────────────────────────────────────────────────────────

model SocialBeneficiary {
  id             String            @id @default(cuid())
  organizationId String
  name           String
  rut            String?
  email          String?
  phone          String?
  address        String?
  city           String?
  region         String?
  lat            Float?
  lng            Float?
  familySize     Int?
  situation      String?                            // descripción libre de la situación
  aidTypes       AidType[]
  status         BeneficiaryStatus @default(ACTIVE)
  notes          String?
  registeredAt   DateTime          @default(now())
  updatedAt      DateTime          @updatedAt

  organization   Organization  @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  deliveries     AidDelivery[]

  @@index([organizationId, status])
  @@map("social_beneficiaries")
}

model AidDelivery {
  id              String    @id @default(cuid())
  beneficiaryId   String
  type            AidType
  description     String
  quantity        String?
  estimatedValue  Decimal?  @db.Decimal(10, 2)
  deliveredById   String?                          // User id del voluntario
  signatureUrl    String?
  photoUrls       String[]
  notes           String?
  deliveredAt     DateTime  @default(now())
  createdAt       DateTime  @default(now())

  beneficiary     SocialBeneficiary @relation(fields: [beneficiaryId], references: [id], onDelete: Cascade)

  @@index([beneficiaryId])
  @@map("aid_deliveries")
}

// ─────────────────────────────────────────────────────────
// RESCATE ECOLÓGICO
// ─────────────────────────────────────────────────────────

model EcologyProject {
  id             String        @id @default(cuid())
  organizationId String
  title          String
  description    String?
  type           EcologyType   @default(REFORESTATION)
  status         ProjectStatus @default(ACTIVE)
  location       String?
  lat            Float?
  lng            Float?
  startDate      DateTime      @default(now())
  endDate        DateTime?
  imageUrl       String?
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  organization   Organization      @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  activities     EcologyActivity[]

  @@index([organizationId, status])
  @@map("ecology_projects")
}

model EcologyActivity {
  id           String   @id @default(cuid())
  projectId    String
  title        String
  description  String?
  date         DateTime
  participants Int      @default(0)
  metrics      Json     @default("{}")              // { trees_planted: 50, waste_kg: 120, area_m2: 500 }
  photoUrls    String[]
  notes        String?
  createdAt    DateTime @default(now())

  project      EcologyProject @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([projectId])
  @@map("ecology_activities")
}

// ─────────────────────────────────────────────────────────
// BIBLIOTECA DE ESPECIES
// ─────────────────────────────────────────────────────────

model Species {
  id                 String             @id @default(cuid())
  organizationId     String
  commonName         String
  scientificName     String
  family             String?
  order              String?
  kingdom            String?
  category           SpeciesCategory
  conservationStatus ConservationStatus @default(LEAST_CONCERN)
  description        String?
  habitat            String?
  distribution       String?
  characteristics    String?
  photoUrls          String[]
  isNative           Boolean            @default(true)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  organization       Organization       @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  sightings          Sighting[]
  populations        PopulationRecord[]

  @@index([organizationId, category])
  @@map("species")
}

model Sighting {
  id            String   @id @default(cuid())
  speciesId     String
  reportedById  String?
  lat           Float
  lng           Float
  locationDesc  String?
  count         Int      @default(1)
  ageStage      String?                              // "adult", "juvenile", "chick", "unknown"
  healthStatus  String?
  condition     String?
  photoUrls     String[]
  notes         String?
  sightedAt     DateTime @default(now())
  createdAt     DateTime @default(now())

  species       Species @relation(fields: [speciesId], references: [id], onDelete: Cascade)

  @@index([speciesId])
  @@index([speciesId, sightedAt])
  @@map("sightings")
}

model PopulationRecord {
  id         String   @id @default(cuid())
  speciesId  String
  date       DateTime
  count      Int
  location   String?
  method     String?                                // "census", "transect", "camera_trap"
  notes      String?
  createdAt  DateTime @default(now())

  species    Species @relation(fields: [speciesId], references: [id], onDelete: Cascade)

  @@index([speciesId, date])
  @@map("population_records")
}

// ─────────────────────────────────────────────────────────
// CONTABILIDAD (NORMATIVA CHILENA)
// ─────────────────────────────────────────────────────────

model Account {
  id             String      @id @default(cuid())
  organizationId String
  code           String                             // "1.1.01.001"
  name           String
  type           AccountType
  parentId       String?
  level          Int         @default(1)            // nivel en la jerarquía
  isActive       Boolean     @default(true)
  allowsEntries  Boolean     @default(true)         // false = solo agrupador
  description    String?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  organization   Organization  @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  parent         Account?      @relation("AccountHierarchy", fields: [parentId], references: [id])
  children       Account[]     @relation("AccountHierarchy")
  lines          JournalLine[]

  @@unique([organizationId, code])
  @@index([organizationId, type])
  @@map("accounts")
}

model JournalEntry {
  id             String      @id @default(cuid())
  organizationId String
  number         Int
  date           DateTime
  description    String                             // glosa del asiento
  costCenter     String?
  reference      String?                            // Nº boleta, factura, etc.
  status         EntryStatus @default(DRAFT)
  createdById    String?
  postedById     String?
  postedAt       DateTime?
  reversedById   String?
  reversedAt     DateTime?
  notes          String?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  organization   Organization  @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  lines          JournalLine[]

  @@unique([organizationId, number])
  @@index([organizationId, date])
  @@index([organizationId, status])
  @@map("journal_entries")
}

model JournalLine {
  id          String  @id @default(cuid())
  entryId     String
  accountId   String
  description String?
  debit       Decimal @default(0) @db.Decimal(15, 2)
  credit      Decimal @default(0) @db.Decimal(15, 2)
  order       Int     @default(0)

  entry       JournalEntry @relation(fields: [entryId], references: [id], onDelete: Cascade)
  account     Account      @relation(fields: [accountId], references: [id])

  @@index([entryId])
  @@index([accountId])
  @@map("journal_lines")
}

// ─────────────────────────────────────────────────────────
// AUDITORÍA (ITIL — Change Management)
// ─────────────────────────────────────────────────────────

model AuditLog {
  id             String   @id @default(cuid())
  organizationId String
  userId         String?
  action         String                             // "member.created", "donation.deleted", etc.
  entity         String                             // nombre del modelo
  entityId       String
  oldValues      Json?
  newValues      Json?
  ipAddress      String?
  userAgent      String?
  createdAt      DateTime @default(now())

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user           User?        @relation(fields: [userId], references: [id])

  @@index([organizationId, action])
  @@index([organizationId, entity, entityId])
  @@index([createdAt])
  @@map("audit_logs")
}
```

---

## Políticas RLS en PostgreSQL

> Archivo: `docker/postgres/init.sql`
> Se ejecuta al crear el contenedor por primera vez.

```sql
-- Habilitar RLS en todas las tablas tenant
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE raffle_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE aid_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecology_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecology_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE species ENABLE ROW LEVEL SECURITY;
ALTER TABLE sightings ENABLE ROW LEVEL SECURITY;
ALTER TABLE population_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_payments ENABLE ROW LEVEL SECURITY;

-- El tenant_id se pasa via SET app.current_org_id = 'xxx'
-- NestJS lo inyecta en cada request via middleware

CREATE POLICY org_isolation ON organizations
  USING (id = current_setting('app.current_org_id', true)::text);

-- Política genérica para tablas con organization_id
-- Aplicar a cada tabla individualmente:
CREATE POLICY org_isolation ON users
  USING (organization_id = current_setting('app.current_org_id', true)::text);

-- Repetir para todas las demás tablas...
-- Super Admin bypass: SET app.current_org_id = 'SUPER_ADMIN' para omitir filtro
```

---

## Notas de implementación

- `cuid()` como ID por defecto — colisiones imposibles, URL-safe
- `Decimal` para todos los montos — nunca `Float` para dinero
- `Json @default("{}")` para campos de configuración extensibles
- Soft delete: NO se usa `deletedAt`. Las entidades tienen `isActive` o `status`
- El campo `settings` en `Organization` almacena configuración variable (colores landing, etc.)
- `AuditLog` se escribe en todos los CUD operations desde el backend (no trigger SQL)
