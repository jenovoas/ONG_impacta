# M20 — CRM Avanzado y Reportes Avanzados
## FASE 3

---

## M20a — CRM (Contactos y Proveedores)

### Responsabilidad única
Agenda centralizada de contactos externos: proveedores, aliados, entidades gubernamentales. Control básico de compras y cuentas por pagar.

### Backend
```
crm/
├── crm.module.ts
├── contacts.controller.ts        ← /crm/contacts
├── suppliers.controller.ts       ← /crm/suppliers
├── purchase-orders.controller.ts ← /crm/purchase-orders
├── contacts.service.ts
├── suppliers.service.ts
└── dto/
    ├── create-contact.dto.ts
    └── create-purchase-order.dto.ts
```

### Frontend — `/crm`

**Tabs: Contactos | Proveedores | Órdenes de Compra**

**Tab Contactos:**
```
DataTable:
| Nombre | Organización | Tipo | Email | Teléfono | Última interacción | Acciones |
Tipos: SUPPLIER | PARTNER | GOVERNMENT | MEDIA | DONOR_CORP | OTHER

Detalle contacto:
- Info básica
- Notas de interacciones (Timeline de texto libre)
- Documentos adjuntos
```

**Tab Proveedores:**
```
DataTable:
| Proveedor | RUT | Categoría | Saldo por pagar | Estado | Acciones |

Detalle proveedor:
- Info + historial de compras
- Cuentas por pagar (órdenes pendientes)
```

**Tab Órdenes de Compra:**
```
DataTable:
| N° OC | Proveedor | Descripción | Monto | Estado | Fecha | Acciones |
Estados: DRAFT | APPROVED | RECEIVED | PAID

Formulario OC:
- supplierId (SearchableSelect)
- items (array: descripción, cantidad, precio unitario)
- deliveryDate
- Totales calculados automáticamente
```

---

## M20b — Reportes Avanzados y Dashboard BI

### Responsabilidad única
Dashboards configurables con visualizaciones avanzadas para toma de decisiones.

### Frontend — `/reportes/avanzados`

```
AdvancedReportsPage
├── Builder de dashboard (drag-and-drop de widgets)
│   Widgets disponibles:
│   - StatCard (métrica con filtro de período)
│   - LineChart (cualquier serie temporal)
│   - BarChart (comparativas)
│   - PieChart (distribución)
│   - DataTable (cualquier listado)
│   - Map (geolocalización)
│
├── Reportes guardados (por nombre)
├── Programar envío por email (semanal/mensual)
└── Export: PDF | Excel | API
```

### Reportes predefinidos disponibles

| Reporte | Descripción |
|---------|-------------|
| Análisis de donantes | RFM, retención, valor de vida |
| Efectividad de campañas | ROI por campaña, costo por donación |
| Impacto ambiental | Métricas acumuladas de ecología |
| Estado de la organización | KPIs globales, tendencias |
| Informe para directorio | Ejecutivo, listo para imprimir |

---

## Reglas de negocio
1. Los dashboards personalizados son por usuario (cada Admin tiene los suyos)
2. Los reportes programados se generan via BullMQ y se envían por email
3. Solo plan PRO y Enterprise tienen acceso a reportes avanzados y CRM
4. Las órdenes de compra APPROVED generan automáticamente un asiento contable en DRAFT (M07)
