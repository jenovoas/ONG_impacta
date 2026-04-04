# M11 — Logística e Inventarios
## FASE 2

---

## Responsabilidad única (SRP)
Control de stock de insumos de ayuda social (alimentos, ropa, medicamentos) en una o más bodegas. Registro de entradas, salidas y alertas de stock mínimo.

---

## Backend

```
inventory/
├── inventory.module.ts
├── warehouses.controller.ts      ← /inventory/warehouses
├── items.controller.ts           ← /inventory/items
├── movements.controller.ts       ← /inventory/items/:id/movements
├── alerts.controller.ts          ← /inventory/alerts
├── warehouses.service.ts
├── items.service.ts
├── movements.service.ts
└── dto/
    ├── create-warehouse.dto.ts
    ├── create-item.dto.ts
    └── create-movement.dto.ts
```

### Alerta de stock mínimo
```
BullMQ job repetible: cada 6 horas
- Buscar items donde currentStock < minStock
- Para cada uno: crear notificación in-app al Admin
- No spam: solo alertar una vez hasta que el stock suba
```

---

## Frontend — `/logistica`

**Tabs: Bodegas | Inventario | Movimientos | Alertas**

### Tab Bodegas
```
Grid de WarehouseCard:
- Nombre bodega
- Dirección
- N° de items
- Valor total del stock
- Button "Ver inventario"
```

### Tab Inventario

```
Select bodega (filtra la tabla)
DataTable de InventoryItem:
| Nombre | Categoría | Unidad | Stock actual | Stock mínimo | Alerta | Vencimiento | Acciones |

StatusBadge de alerta:
- Verde: stock > mínimo
- Ámbar: stock ≤ mínimo × 1.5 (advertencia)
- Rojo: stock ≤ mínimo (crítico)

Button "Registrar entrada" | Button "Registrar salida"
```

### Formulario nuevo item
```
- name (Input)
- category (Select: Alimentos | Ropa | Medicamentos | Útiles | Herramientas | Otro)
- unit (Select: kg | unidad | caja | litro | bolsa)
- warehouseId (Select de bodegas)
- currentStock (Input numérico)
- minStock (Input numérico → para alertas)
- expiresAt (DatePicker, opcional)
- batchNumber (Input, opcional)
```

### Registrar movimiento (Sheet lateral)
```
- type (ToggleGroup: "Entrada" | "Salida" | "Ajuste")
- quantity (Input numérico)
- reason (Select según tipo):
  Entrada: Donación en especie | Compra | Transferencia
  Salida: Entrega a beneficiario | Uso interno | Vencimiento
  Ajuste: Corrección de inventario | Pérdida
- reference (Input: N° entrega o donación relacionada)
- notes (Textarea)
```

### Tab Alertas
```
Lista de items con stock crítico:
| Item | Bodega | Stock actual | Stock mínimo | Diferencia |
Button "Ver item" → lleva al item en inventario
```

---

## Integración con M05 (Ayuda Social)
Al registrar una entrega en M05 (`/social-aid/beneficiaries/:id/deliveries`):
- Campo `itemId` opcional: referencia a un `InventoryItem`
- Si se provee: descontar automáticamente del stock (crear StockMovement tipo OUT)
- Si el stock queda bajo mínimo: disparar alerta

---

## Reglas de negocio
1. Stock nunca puede quedar negativo: validar en backend antes de registrar salida
2. Un item tiene exactamente una bodega (sin transferencias entre bodegas en Fase 2)
3. Items vencidos: solo se pueden dar de baja (movimiento tipo OUT razón VENCIMIENTO), no registrar salida normal
