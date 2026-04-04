# M09 — Transparencia y Rendición de Cuentas
## FASE 2

---

## Responsabilidad única (SRP)
Dashboard público de transparencia de cada ONG. Visualización de uso de fondos, proyectos activos e informes descargables. Es un módulo de solo lectura que agrega datos de otros módulos.

---

## Backend

### Endpoint público (sin auth)
```
GET /transparency/:slug
```
```json
{
  "data": {
    "orgName": "string",
    "logoUrl": "string|null",
    "period": { "year": 2026, "quarter": 1 },
    "funds": {
      "totalReceived": 5000000,
      "totalSpent": 3200000,
      "balance": 1800000,
      "byCategory": [
        { "category": "Ayuda alimentaria", "amount": 1500000, "percentage": 47 },
        { "category": "Ecología", "amount": 800000, "percentage": 25 }
      ]
    },
    "impact": {
      "beneficiaries": 200,
      "volunteers": 45,
      "events": 12,
      "treesPlanted": 1200,
      "wasteKg": 850
    },
    "activeProjects": [{ "title": "string", "status": "string", "progress": 75 }],
    "annualReports": [{ "year": 2025, "url": "string" }],
    "certifications": []
  }
}
```

---

## Frontend — Página pública `/transparency/:slug` (en apps/landing)

```
TransparencyPage
├── Navbar ONG (igual que landing)
├── Hero: "Portal de Transparencia — [Nombre ONG]"
├── Período selector (Trimestre/Año)
│
├── Section "Uso de Fondos"
│   ├── PieChart (recharts): distribución por categoría
│   ├── BarChart: ingresos vs egresos mensual
│   └── Tabla detalle por categoría
│
├── Section "Impacto"
│   Grid de KPIs:
│   - Beneficiarios | Voluntarios | Eventos | Árboles | Residuos
│
├── Section "Proyectos Activos"
│   Cards con: título + descripción + progress bar
│
├── Section "Informes Anuales"
│   Lista de PDFs descargables por año
│
└── Sello de transparencia (badge visual)
```

---

## Frontend — Panel admin `/transparencia` (en apps/web)

```
TransparencyAdminPage
├── Preview de cómo se ve la página pública
├── Button "Ver página pública" (nueva pestaña)
├── Configuración:
│   - isPublic (Toggle: "Página de transparencia visible")
│   - Toggle "Mostrar balance financiero"
│   - Toggle "Mostrar beneficiarios"
│   - Toggle "Mostrar impacto ecológico"
├── Subir informes anuales:
│   - FileUpload PDF + año selector
│   - Lista de informes subidos con opción de eliminar
└── Certificaciones:
    - FileUpload de sellos/certificaciones
```

---

## Reglas de negocio
1. La página de transparencia es pública solo si `isPublic = true` en configuración
2. El balance financiero usa datos de `JournalEntry` (M07) — requiere que la ONG use contabilidad
3. Si la ONG no usa contabilidad, mostrar solo los datos de donaciones (M03)
