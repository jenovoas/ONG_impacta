# M16 — E-Learning y Capacitación
## FASE 3

---

## Responsabilidad única
Plataforma LMS básica para capacitar voluntarios y socios. Cursos con módulos, quiz y certificados automáticos. Sin videoconferencia (usa links externos a Zoom/Meet).

---

## Backend
```
elearning/
├── elearning.module.ts
├── courses.controller.ts       ← /courses
├── enrollments.controller.ts   ← /courses/:id/enroll, /courses/:id/progress
├── courses.service.ts
├── enrollments.service.ts
└── dto/
    ├── create-course.dto.ts
    └── update-progress.dto.ts
```

### Endpoints
```
GET  /courses                      lista (filtros: category, isPublic)
GET  /courses/:id                  detalle + módulos
POST /courses                      crear curso (Admin)
PATCH /courses/:id
POST /courses/:id/enroll           inscribirse
PATCH /courses/:id/progress        actualizar progreso { moduleIndex, completed }
GET  /courses/:id/certificate      generar certificado PDF (si completado)
```

---

## Frontend — `/elearning`

**Tabs: Catálogo | Mis cursos | Gestionar (solo Admin)**

### Tab Catálogo
```
Grid de CourseCard:
- Imagen
- Título
- Categoría badge
- Duración estimada
- N° módulos
- ProgressBar (si ya inscrito)
- Button "Inscribirse" / "Continuar" / "Completado ✓"
```

### Detalle curso `/elearning/:id`
```
CourseDetailPage
├── Hero: imagen + título + descripción
├── Sidebar: lista de módulos con estado (✓ completado / → pendiente)
└── Contenido módulo actual:
    ├── Texto (markdown)
    ├── Video embed (YouTube/Vimeo link)
    ├── Recursos descargables (PDFs)
    └── [Si es último módulo] Quiz final
        → Si pasa: generar certificado automático
        → Button "Descargar certificado"
```

---

## Reglas de negocio
1. El progreso se guarda por módulo: al completar todos → enrollment.completedAt = now()
2. El certificado incluye: nombre, curso, fecha, N° de certificado, logo ONG
3. Los cursos públicos (isPublic=true) aparecen en la landing de la ONG
4. El quiz es opcional: si no hay quiz, al completar el último módulo se certifica automáticamente
