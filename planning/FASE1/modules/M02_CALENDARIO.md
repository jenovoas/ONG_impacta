# M02 — Calendario y Tareas
## FASE 1

---

## Responsabilidad única (SRP)
Gestión de tareas asignables y visualización unificada del calendario (tareas + eventos). No gestiona la lógica de eventos (M04).

---

## Backend

```
tasks/
├── tasks.module.ts
├── tasks.controller.ts
├── tasks.service.ts
├── calendar.controller.ts      ← GET /calendar/events (vista unificada)
└── dto/
    ├── create-task.dto.ts
    ├── update-task.dto.ts
    └── update-task-status.dto.ts
```

### Lógica de negocio
- Al crear tarea con `isRecurring: true`, el backend genera instancias futuras usando RRULE (librería: `rrule`)
- Solo el creador o Admin puede eliminar una tarea
- Al marcar como COMPLETED: registrar `completedAt = now()`
- Las subtareas se resuelven en cascada: si el padre se cancela, las hijas también

---

## Frontend

### M02-01 — `/calendario`

**Librería:** FullCalendar v6 (`@fullcalendar/react`, `daygrid`, `timegrid`, `interaction`)

```
CalendarPage
├── PageHeader "Calendario"
│   └── Acciones: Toggle [Mes | Semana | Día] | Button "Nueva tarea"
├── FullCalendar
│   ├── Vista mensual (default)
│   ├── Vista semanal (con horario)
│   └── Vista diaria
└── EventDetailSheet (se abre al hacer click en un evento)
    - Muestra datos del evento/tarea
    - Botón "Ver detalle" → navega a la pantalla del recurso
```

**Colores por tipo de evento en el calendario:**
```
Tarea PENDING:      #4A4A4A (gris)
Tarea IN_PROGRESS:  #00A8FF (azul)
Tarea COMPLETED:    #00D4AA (verde)
Tarea URGENT:       #FF4757 (rojo)
Evento GENERAL:     #0077B6 (azul oscuro)
Evento FUNDRAISING: #00D4AA (verde)
Evento ECOLOGY:     #00A896 (verde bosque)
Evento SOCIAL:      #FFA502 (ámbar)
```

---

### M02-02 — `/tareas`

**Layout:** Toggle [Lista | Kanban] + DataTable o KanbanBoard

**Vista Lista — columnas DataTable:**
| Campo | Descripción |
|-------|-------------|
| Título | con prioridad badge |
| Asignado a | Avatar + nombre |
| Vencimiento | fecha, rojo si vencida |
| Estado | StatusBadge |
| Prioridad | badge (LOW/MEDIUM/HIGH/URGENT) |
| Acciones | ver, editar, cambiar estado |

**Filtros:**
- Estado: Todos / Pendiente / En curso / Completada / Cancelada
- Prioridad: Todas / Baja / Media / Alta / Urgente
- Asignado a: Select con usuarios de la ONG
- Vencimiento: DateRangePicker

**Vista Kanban — 4 columnas:**
```
PENDING → IN_PROGRESS → COMPLETED → CANCELLED
```
Cada columna muestra `TaskKanbanCard`. Drag-and-drop opcional (Fase 2).

---

### M02-03 — `/tareas/nueva` y `/tareas/:id/editar`

**Formulario (una sola pantalla, no multi-step):**
```
- title (Input, required)
- description (Textarea)
- priority (SegmentedControl: LOW | MEDIUM | HIGH | URGENT)
- assigneeId (SearchableSelect de usuarios de la ONG)
- dueDate (DatePicker)
- tags (TagInput: escribir + Enter para agregar)
- isRecurring (Toggle)
  └── [si true] recurringRule (Select: "Semanal" | "Quincenal" | "Mensual" | "Custom RRULE")
- parentTaskId (SearchableSelect de tareas existentes, opcional)
```

**Acciones:**
- "Cancelar"
- "Guardar" → POST/PATCH → toast → redirect /tareas/:id

---

### M02-04 — `/tareas/:id`

```
TaskDetailPage
├── PageHeader
│   ├── Title + PriorityBadge + StatusBadge
│   └── Acciones: "Editar" | SegmentedControl de estado | "Eliminar"
├── Grid 2 columnas
│   ├── Left (7/12):
│   │   ├── Descripción (markdown renderizado)
│   │   ├── Subtareas (lista colapsable con checkbox por subtarea)
│   │   └── Comentarios (Timeline de TaskComment + form para agregar)
│   └── Right (5/12):
│       ├── Asignado a: MemberCard
│       ├── Vencimiento: fecha + días restantes/vencidos
│       ├── Prioridad: badge
│       ├── Etiquetas: badges
│       ├── Creado por: nombre + fecha
│       └── Completado: fecha (si aplica)
```

**Agregar comentario:**
```
Input text + Button "Comentar"
```

**Cambiar estado desde header:**
```
SegmentedControl: Pendiente → En curso → Completada
(Cancelada solo desde el menú "...")
```

---

## Reglas de negocio

1. Una tarea COMPLETED no puede volver a PENDING ni IN_PROGRESS (solo Cancelar)
2. Al crear subtarea: heredar `organizationId` y `priority` del padre
3. Tarea con subtareas: no se puede marcar COMPLETED hasta que todas las subtareas estén COMPLETED o CANCELLED
4. Tarea con `dueDate < hoy` y status PENDING/IN_PROGRESS: mostrar en rojo en el calendario y la lista
5. Tarea asignada: enviar notificación en-app al asignado (BullMQ job)

---

## i18n — claves

```json
{
  "tasks": {
    "title": "Tareas",
    "new": "Nueva tarea",
    "status": {
      "PENDING": "Pendiente",
      "IN_PROGRESS": "En curso",
      "COMPLETED": "Completada",
      "CANCELLED": "Cancelada"
    },
    "priority": {
      "LOW": "Baja",
      "MEDIUM": "Media",
      "HIGH": "Alta",
      "URGENT": "Urgente"
    }
  },
  "calendar": { "title": "Calendario" }
}
```
