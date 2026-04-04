# M06 — Rescate Ecológico y Biblioteca de Especies
## FASE 1

---

## Responsabilidad única (SRP)
M06a: proyectos de conservación, jornadas y métricas de impacto ambiental.
M06b: catálogo científico de especies nativas, avistamientos y seguimiento de poblaciones.
Son módulos NestJS separados pero agrupados aquí por dominio.

---

## ⚠️ Prototipo de referencia visual

> **`/proto` es de SOLO LECTURA. No escribir código ahí. No copiar HTML.**
> Abrir en el navegador como referencia visual y recrear en React + shadcn/ui.

### M06a — Rescate Ecológico

| Estado | Archivo | Pantallas que cubre |
|--------|---------|---------------------|
| ❌ Pendiente | `proto/ecologia.html` | EC01 Lista proyectos, EC02 Detalle + galería, EC03 Nuevo proyecto, EC04 Registrar jornada |

### M06b — Biblioteca de Especies

| Estado | Archivo | Pantallas que cubre |
|--------|---------|---------------------|
| ✅ Disponible | `proto/biblioteca-especies-pro.html` | BE01 Catálogo, BE02 Detalle especie + avistamientos |
| ✅ Disponible | `proto/biblioteca-especies.html` | BE01 Catálogo, BE02 Detalle especie |
| ✅ Disponible | `proto/biblioteca-especies-es.html` | Variante español |
| ❌ Pendiente | *(en proto existente)* | BE03 Nueva especie, BE04 Registrar avistamiento, BE05 Mapa, BE06 Seguimiento poblaciones |

Referencia primaria M06b: **`proto/biblioteca-especies-pro.html`**

**Antes de implementar M06a**: crear `proto/ecologia.html` en Stitch, exportar y actualizar `planning/UI_PROTOTYPES_STITCH.md`.

Guías de diseño para `ecologia.html`:
- KPI cards con métricas grandes (display-lg): "847 Árboles plantados", "12.3 ha restauradas"
- Galería de fotos de jornadas en grid masonry
- Gráficos de barras apiladas para métricas acumuladas por proyecto

---

## Backend

```
ecology/
├── ecology.module.ts
├── projects.controller.ts        ← /ecology/projects
├── activities.controller.ts      ← /ecology/projects/:id/activities
├── projects.service.ts
├── activities.service.ts
└── dto/
    ├── create-project.dto.ts
    └── create-activity.dto.ts

species/
├── species.module.ts
├── species.controller.ts         ← /species
├── sightings.controller.ts       ← /species/:id/sightings, /species/sightings
├── population.controller.ts      ← /species/:id/population
├── species.service.ts
├── sightings.service.ts
├── population.service.ts
└── dto/
    ├── create-species.dto.ts
    ├── create-sighting.dto.ts
    └── create-population.dto.ts
```

---

## Frontend — Ecología

### M06-01 — `/ecologia`

**Grid de ProjectCard:**
```
ProjectCard
├── Imagen (o ícono por tipo: árbol, escoba, ojo)
├── Badge(tipo: REFORESTATION | CLEANUP | CONSERVATION | ...)
├── Título + descripción corta
├── Lugar
├── StatusBadge
├── KPIs compactos:
│   🌲 Árboles plantados | 🗑️ Residuos (kg) | 👥 Voluntarios
└── Acciones: "Ver" | "Editar"
```

---

### M06-02 — `/ecologia/nuevo` y `/ecologia/:id/editar`

```
- title (Input, required)
- type (Select: Reforestación | Limpieza | Conservación | Monitoreo | Educación)
- description (Textarea)
- location (Input)
- MapView interactivo: click para colocar punto
- startDate (DatePicker)
- endDate (DatePicker, opcional)
- imageUrl (FileUpload)
```

---

### M06-03 — `/ecologia/:id`

```
ProjectDetailPage
├── Hero: imagen + título + tipo + estado
├── Tabs: Detalle | Actividades | Galería | Métricas
│
├── Tab Detalle: descripción, lugar, fechas, MapView
│
├── Tab Actividades:
│   ├── Timeline de EcologyActivity (cronológico inverso)
│   │   Cada actividad:
│   │   - fecha | título | participantes | métricas
│   │   - fotos (thumbnails)
│   └── Button "Registrar nueva jornada"
│
├── Tab Galería:
│   Grid de imágenes de todas las actividades
│   (lightbox al hacer click)
│
└── Tab Métricas (acumuladas):
    Grid de KPIs:
    - 🌲 Total árboles plantados
    - 📏 Área trabajada (m²)
    - 🗑️ Residuos recolectados (kg)
    - 👥 Total participantes únicos
    - 📅 Jornadas realizadas
    Chart de barras: métricas por mes
```

---

### M06-04 — Registrar Jornada (Sheet lateral)

```
Sheet "Nueva jornada"
├── title (Input, required)
├── description (Textarea)
├── date (DatePicker, required)
├── participants (Input numérico)
├── Métricas (según tipo de proyecto):
│   [REFORESTATION] trees_planted (Input)
│   [CLEANUP]       waste_kg (Input)
│   [Todos]         area_m2 (Input)
│   [Todos]         native_species (Input)
├── photoUrls (FileUpload múltiple, máx 10)
└── notes (Textarea)
```

---

## Frontend — Especies

### M06-05 — `/especies`

**Layout:** Toggle [Grid | Lista] + filtros laterales

**SpeciesCard (grid):**
```
├── Imagen (o icono por categoría)
├── Badge(categoría: Flora | Mamífero | Ave | Reptil | ...)
├── Nombre común (bold)
├── Nombre científico (italic, text-muted)
├── Badge conservación (color por estado: rojo=CR, naranja=EN, amarillo=VU, verde=LC)
└── "X avistamientos"
```

**Filtros laterales:**
```
- Búsqueda: nombre común o científico
- Categoría (CheckboxGroup)
  ☐ Flora  ☐ Mamífero  ☐ Ave  ☐ Reptil  ☐ Anfibio  ☐ Pez  ☐ Insecto
- Estado de conservación (CheckboxGroup)
  ☐ CR (Crítico)  ☐ EN (En peligro)  ☐ VU (Vulnerable)  ☐ NT  ☐ LC
- ☐ Solo especies nativas
```

---

### M06-06 — `/especies/nueva` y `/especies/:id/editar`

**Formulario — 2 pasos:**

**Paso 1: Clasificación taxonómica**
```
- commonName (Input, required)
- scientificName (Input, required, italic)
- category (Select: FLORA | FAUNA_MAMMAL | FAUNA_BIRD | ...)
- conservationStatus (Select con colores)
- family (Input)
- order (Input)
- kingdom (Input)
- isNative (Toggle: "¿Especie nativa?")
```

**Paso 2: Descripción y multimedia**
```
- description (Textarea: descripción general)
- habitat (Textarea: tipo de hábitat)
- distribution (Textarea: distribución geográfica)
- characteristics (Textarea: características morfológicas)
- photoUrls (FileUpload múltiple, máx 10 fotos)
```

---

### M06-07 — `/especies/:id`

```
SpeciesDetailPage
├── Hero: foto principal (carrusel si hay varias) + nombre común + científico
├── Badge categoría + Badge conservación
├── Tabs: Ficha | Avistamientos | Población
│
├── Tab Ficha:
│   Grid 2 columnas:
│   - Taxonomía: familia, orden, reino
│   - Estado de conservación con descripción
│   - Hábitat
│   - Distribución
│   - Características
│   - ¿Nativa? badge
│
├── Tab Avistamientos:
│   ├── MapView con todos los puntos de avistamiento
│   │   Popup: fecha, cantidad, condición
│   └── Lista de últimos 20 avistamientos
│       Fecha | Coordenadas | Cantidad | Condición | Reportado por
│   └── Button "Registrar avistamiento"
│
└── Tab Población:
    Chart de líneas: evolución del conteo a lo largo del tiempo
    Tabla: fecha | conteo | método | ubicación
    Button "Agregar registro"
```

---

### M06-08 — `/especies/avistamientos/nuevo`

```
SightingFormPage
├── speciesId (SearchableSelect del catálogo, required)
│   └── Si no existe: Button "Agregar nueva especie" → /especies/nueva
├── Sección "Ubicación"
│   ├── MapView interactivo: click para colocar punto
│   ├── Button "Usar mi ubicación GPS" (Geolocation API)
│   └── locationDesc (Input: descripción del lugar, opcional)
├── Sección "Observación"
│   ├── sightedAt (DateTimePicker, default: ahora)
│   ├── count (Input numérico, default: 1)
│   ├── ageStage (Select: Adulto | Juvenil | Cría | Desconocido)
│   ├── healthStatus (Select: Saludable | Herido | Enfermo | Muerto | Desconocido)
│   ├── condition (Textarea: condiciones del avistamiento)
│   └── notes (Textarea)
├── photoUrls (FileUpload múltiple, máx 5)
└── Button "Registrar avistamiento"
```

---

### M06-09 — `/especies/mapa`

```
MapPage (igual estructura que /ayuda-social/mapa)
├── MapView full-screen con todos los avistamientos
│   Marcadores agrupados por especie (color por categoría)
│   Popup: nombre especie + fecha + cantidad
└── Panel lateral:
    - Filtro por especie (SearchableSelect)
    - Filtro por categoría
    - Filtro por fecha
    - Filtro por estado de conservación
```

---

## Colores de conservación (aplicar en badges)

```
EXTINCT:                bg-gray-800 text-gray-400
EXTINCT_IN_WILD:        bg-gray-700 text-gray-300
CRITICALLY_ENDANGERED:  bg-danger/20 text-danger (rojo)
ENDANGERED:             bg-orange-900/30 text-orange-400
VULNERABLE:             bg-warning/20 text-warning (ámbar)
NEAR_THREATENED:        bg-yellow-900/30 text-yellow-400
LEAST_CONCERN:          bg-success/20 text-success (verde)
DATA_DEFICIENT:         bg-muted text-muted-foreground
```

---

## Reglas de negocio

1. Un avistamiento sin foto es válido
2. La localización GPS es obligatoria para avistamientos (no se puede guardar sin lat/lng)
3. El catálogo de especies es compartido dentro de la ONG; cualquier voluntario con permiso puede agregar avistamientos
4. Un proyecto COMPLETED: solo lectura, no acepta nuevas actividades
5. Las métricas de un proyecto se calculan sumando todas sus actividades (no se almacenan agregadas)

---

## i18n — claves

```json
{
  "ecology": {
    "title": "Rescate Ecológico",
    "new_project": "Nuevo proyecto",
    "new_activity": "Registrar jornada",
    "types": {
      "REFORESTATION": "Reforestación",
      "CLEANUP": "Limpieza",
      "CONSERVATION": "Conservación",
      "MONITORING": "Monitoreo",
      "EDUCATION": "Educación"
    }
  },
  "species": {
    "title": "Biblioteca de Especies",
    "new": "Nueva especie",
    "new_sighting": "Registrar avistamiento",
    "categories": {
      "FLORA": "Flora",
      "FAUNA_MAMMAL": "Mamífero",
      "FAUNA_BIRD": "Ave",
      "FAUNA_REPTILE": "Reptil",
      "FAUNA_AMPHIBIAN": "Anfibio",
      "FAUNA_FISH": "Pez",
      "FAUNA_INSECT": "Insecto",
      "FAUNA_OTHER": "Otro"
    }
  }
}
```
