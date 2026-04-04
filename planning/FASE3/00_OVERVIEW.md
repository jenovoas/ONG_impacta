# FASE 3 — Madurez e Innovación
## Impacta+ SaaS (4-5 semanas, post Fase 2)

> **Prerrequisito:** Fase 2 completa. Mínimo 50 ONGs activas.
> **Principio:** Los módulos de IA/ML requieren volumen de datos real de Fases 1 y 2.
> **Riesgo:** Fase 3 tiene alta complejidad técnica. Validar demanda antes de implementar.

---

## Módulos

| ID | Módulo | Prioridad | Complejidad |
|----|--------|-----------|-------------|
| M16 | E-Learning y Capacitación | Media | Media |
| M17 | IA y Analytics Predictivos | Baja | Alta |
| M18 | Sistema de Emergencias | Media | Alta |
| M19 | API Pública y Developer Portal | Media | Media |
| M20 | CRM Avanzado (Contactos, Proveedores) | Media | Media |
| M21 | Reportes Avanzados y Dashboards BI | Alta | Media |

---

## Cambios al schema Prisma en Fase 3

```prisma
// M16 — E-Learning
model Course {
  id             String    @id @default(cuid())
  organizationId String
  title          String
  description    String?
  category       String
  isPublic       Boolean   @default(false)
  modules        Json      // [{ title, content, order, videoUrl }]
  quiz           Json?
  certificateTemplate String?
  createdAt      DateTime  @default(now())
  organization   Organization @relation(fields: [organizationId], references: [id])
  enrollments    CourseEnrollment[]
  @@map("courses")
}

model CourseEnrollment {
  id         String   @id @default(cuid())
  courseId   String
  userId     String
  progress   Int      @default(0)     // 0-100 porcentaje
  completedAt DateTime?
  certificateUrl String?
  createdAt  DateTime @default(now())
  course     Course @relation(fields: [courseId], references: [id])
  @@map("course_enrollments")
}

// M18 — Emergencias
model EmergencyAlert {
  id             String    @id @default(cuid())
  organizationId String
  title          String
  message        String
  severity       String    // LOW | MEDIUM | HIGH | CRITICAL
  type           String    // NATURAL_DISASTER | HEALTH | SECURITY | OTHER
  lat            Float?
  lng            Float?
  radius         Float?    // km afectados
  status         String    @default("ACTIVE")
  sentAt         DateTime  @default(now())
  resolvedAt     DateTime?
  sentCount      Int       @default(0)
  organization   Organization @relation(fields: [organizationId], references: [id])
  @@map("emergency_alerts")
}

// M19 — API Pública
model ApiKey {
  id             String   @id @default(cuid())
  organizationId String
  name           String
  keyHash        String   @unique     // hash del API key
  permissions    String[]
  lastUsedAt     DateTime?
  expiresAt      DateTime?
  isActive       Boolean  @default(true)
  createdAt      DateTime @default(now())
  organization   Organization @relation(fields: [organizationId], references: [id])
  @@map("api_keys")
}

// M20 — CRM
model Contact {
  id             String   @id @default(cuid())
  organizationId String
  type           String   // SUPPLIER | PARTNER | GOVERNMENT | MEDIA | OTHER
  name           String
  email          String?
  phone          String?
  organization   String?  // nombre de la empresa/institución
  notes          String?
  createdAt      DateTime @default(now())
  orgRelation    Organization @relation(fields: [organizationId], references: [id])
  @@map("contacts")
}
```

---

## Criterios para iniciar Fase 3

- [ ] Fase 2 en producción > 30 días sin bugs críticos
- [ ] Al menos 50 ONGs activas
- [ ] > 10.000 transacciones en BD (volumen para modelos ML)
- [ ] Equipo de desarrollo ampliado (al menos 1 ML engineer para M17)
- [ ] Validación de demanda: encuesta confirmando que los módulos Fase 3 son valorados

---

## Notas de arquitectura para Fase 3

### IA (M17): no implementar ML custom
Usar servicios externos:
- Predicción de donaciones: AWS Forecast o Google Cloud AI Platform
- Segmentación de donantes: clustering via Python microservicio
- Chatbot: API de Claude o GPT-4 (no entrenar modelo propio)

### API Pública (M19): versioning desde el inicio
```
/api/v1/...    ← Fases 1 y 2 (uso interno)
/api/public/v1/... ← Fase 3 (uso externo con API Key)
```

### Emergencias (M18): requiere FCM + SMS
- Notificaciones push: ya disponible en app móvil (Fase 2)
- SMS: integrar Twilio o Amazon SNS
- Radio de impacto: geolocalización de voluntarios activos
