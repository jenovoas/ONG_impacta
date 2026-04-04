# M07 — Contabilidad (Normativa Chilena)
## FASE 1

---

## Responsabilidad única (SRP)
Administración contable completa bajo normativa chilena: plan de cuentas, libro diario con partida doble, libros mayores, balances y exportación SII. No gestiona pagos ni donaciones (M03).

---

## Backend

```
accounting/
├── accounting.module.ts
├── accounts.controller.ts        ← /accounting/accounts
├── journal.controller.ts         ← /accounting/journal
├── reports.controller.ts         ← /accounting/ledger, trial-balance, balance-sheet, income-statement
├── sii.controller.ts             ← /accounting/sii
├── accounts.service.ts
├── journal.service.ts
├── reports.service.ts
├── sii.service.ts
└── dto/
    ├── create-account.dto.ts
    ├── create-journal-entry.dto.ts
    └── sii-report.dto.ts
```

### Validación de partida doble (crítica)
```typescript
// journal.service.ts → create()
const totalDebit  = lines.reduce((sum, l) => sum + l.debit, 0)
const totalCredit = lines.reduce((sum, l) => sum + l.credit, 0)
if (Math.abs(totalDebit - totalCredit) > 0.01) {
  throw new BadRequestException('El asiento no cuadra: débitos ≠ créditos')
}
if (lines.length < 2) {
  throw new BadRequestException('Un asiento requiere mínimo 2 líneas')
}
```

### Numeración automática
```typescript
// Número correlativo por organización y año
// Formato: 2026-0001, 2026-0002, ...
// Se obtiene con: MAX(number) + 1 WHERE organizationId AND year(date) = year(now())
```

### Asiento POSTED: inmutable
```typescript
// Si entry.status === 'POSTED': lanzar ForbiddenException en cualquier intento de edición
// Para corregir un asiento POSTED: crear asiento de reverso (mismos valores invertidos)
// PATCH /accounting/journal/:id/reverse → crea nuevo asiento con descripción "Reverso de #N"
```

### Seed: plan de cuentas estándar para ONGs chilenas
```
El seed debe crear en `prisma/seed.ts` el plan de cuentas básico:

1. ACTIVO
  1.1. Activo Circulante
    1.1.01. Caja y Banco
      1.1.01.001. Caja chica
      1.1.01.002. Banco cuenta corriente
    1.1.02. Cuentas por Cobrar
  1.2. Activo Fijo
    1.2.01. Maquinaria y Equipos
    1.2.02. Depreciación Acumulada (crédito)

2. PASIVO
  2.1. Pasivo Circulante
    2.1.01. Cuentas por Pagar
    2.1.02. Remuneraciones por Pagar
    2.1.03. Impuestos por Pagar

3. PATRIMONIO
  3.1. Capital
  3.2. Resultado del Ejercicio
  3.3. Resultados Acumulados

4. INGRESOS
  4.1. Donaciones Recibidas
  4.2. Cuotas de Socios
  4.3. Ingresos por Eventos
  4.4. Otros Ingresos

5. EGRESOS
  5.1. Gastos Administrativos
  5.2. Gastos Operacionales
  5.3. Gastos de Personal
  5.4. Gastos Financieros
```

---

## Frontend

### M07-01 — `/contabilidad`

**Dashboard contable:**
```
Row de 4 KPIs:
1. Ingresos del mes    (cuentas tipo REVENUE)
2. Egresos del mes     (cuentas tipo EXPENSE)
3. Resultado del mes   (ingresos - egresos), verde si positivo, rojo si negativo
4. Saldo en caja/banco (cuenta 1.1.01.xxx)

Gráfico de barras dobles: Ingresos vs Egresos por mes (últimos 6 meses)

Alertas:
- Asientos en DRAFT sin contabilizar
- Cuentas con saldo deudor inesperado
```

---

### M07-02 — `/contabilidad/cuentas`

**Árbol de cuentas:**
```
AccountTree
├── Cada cuenta padre: expandible/colapsable
├── Cada cuenta: código | nombre | tipo | saldo actual | acciones
│   Saldo: calculado en tiempo real (suma de journal lines)
│   Cuentas agrupadoras (allowsEntries=false): solo expand/collapse, sin saldo individual
├── Button "+ Agregar cuenta" (abre Sheet)
└── Toggle "Solo cuentas activas / Todas"
```

**Sheet "Nueva cuenta":**
```
- code (Input, format "X.X.XX.XXX", validar unicidad)
- name (Input, required)
- type (Select: ASSET | LIABILITY | EQUITY | REVENUE | EXPENSE, read-only si tiene padre)
- parentId (TreeSelect del plan de cuentas, opcional)
- allowsEntries (Toggle: "Permite asientos directos")
- description (Textarea)
```

---

### M07-03 — `/contabilidad/diario`

**DataTable de asientos:**
| Campo | Descripción |
|-------|-------------|
| N° | number correlativo |
| Fecha | fecha del asiento |
| Glosa | descripción |
| Centro de costo | si existe |
| Referencia | N° boleta, etc. |
| Total debe | suma líneas |
| Total haber | suma líneas |
| Estado | StatusBadge (DRAFT/POSTED/REVERSED) |
| Acciones | ver, contabilizar (si DRAFT), revertir (si POSTED) |

**Filtros:**
- Estado: Todos / Borrador / Contabilizado
- Fecha: DateRangePicker
- Centro de costo: Select
- Búsqueda: glosa, referencia

---

### M07-04 — `/contabilidad/diario/nuevo`

**Formulario de asiento:**
```
JournalEntryForm
├── Header del asiento:
│   ├── date (DatePicker, default hoy)
│   ├── description (Input "Glosa", required)
│   ├── costCenter (Input, opcional)
│   └── reference (Input "Referencia", opcional)
│
├── Tabla de líneas del asiento:
│   Columnas: | Cuenta | Descripción | Debe (CLP) | Haber (CLP) | Eliminar |
│   Cada fila:
│   - accountId (SearchableSelect del plan de cuentas, solo allowsEntries=true)
│   - description (Input opcional)
│   - debit (CurrencyInput, si > 0 → credit = 0)
│   - credit (CurrencyInput, si > 0 → debit = 0)
│   - Button (X) eliminar fila
│
│   Footer de la tabla:
│   - Button "+ Agregar línea"
│   - TOTALES: "Debe: $X | Haber: $X"
│   - Indicador de cuadre:
│     ✓ verde "Asiento cuadrado" (si debe = haber)
│     ✗ rojo "Diferencia: $X" (si debe ≠ haber)
│
└── Acciones:
    - "Cancelar"
    - "Guardar borrador" (status DRAFT, sin validar cuadre)
    - "Contabilizar" (valida cuadre, status POSTED, no editable)
```

**Regla UX importante:**
- No se puede enviar el formulario con "Contabilizar" si el asiento no cuadra
- El botón "Contabilizar" se deshabilita si totalDebit ≠ totalCredit

---

### M07-05 — `/contabilidad/mayor`

```
LedgerPage
├── Selector de cuenta (SearchableSelect, required)
├── DateRangePicker (filtro de período)
├── [Si hay cuenta seleccionada]:
│   ├── Header: código | nombre | tipo | saldo anterior | saldo actual
│   └── DataTable:
│       | Fecha | N° Asiento | Glosa | Debe | Haber | Saldo acumulado |
│       Última fila: TOTALES
```

---

### M07-06 — `/contabilidad/balance`

**Tabs: Balance de Comprobación | Balance General | Estado de Resultados**

**Tab Balance de Comprobación:**
```
DateRangePicker (período)
Tabla:
| Código | Nombre | Tipo | Total Debe | Total Haber | Saldo |
Fila final: TOTALES (debe = haber si cuadra)
Button "Exportar PDF" | "Exportar Excel"
```

**Tab Balance General:**
```
Dos columnas:
ACTIVOS                     PASIVOS Y PATRIMONIO
  Activo Circulante           Pasivo Circulante
    Caja y Banco    $X          Cuentas por Pagar  $X
    ...                         ...
  Activo Fijo                 Patrimonio
    ...                         Capital            $X
                                Resultado          $X
─────────────────           ────────────────────────
TOTAL ACTIVOS      $X       TOTAL PASIVO + PAT.    $X
```

**Tab Estado de Resultados:**
```
INGRESOS
  Donaciones           $X
  Cuotas               $X
  ...
─────────────────────────
  TOTAL INGRESOS       $X

EGRESOS
  Gastos admin         $X
  ...
─────────────────────────
  TOTAL EGRESOS        $X

══════════════════════════
RESULTADO DEL PERÍODO  $X  (verde si positivo, rojo si negativo)
```

---

### M07-07 — `/contabilidad/sii`

```
SIIPage
├── H2 "Exportación SII"
├── Card "Formulario 29 (IVA mensual)"
│   ├── Select mes/año
│   └── Button "Generar F29" → descarga XML/CSV
└── Card "Formulario 39 (Impuesto 2da categoría)"
    ├── Select año
    └── Button "Generar F39" → descarga XML/CSV
```

---

## Reglas de negocio

1. Solo ADMIN_ONG con permiso `accounting:write` puede crear asientos
2. Solo ADMIN_ONG con permiso `accounting:close` puede contabilizar y revertir
3. Un asiento POSTED solo puede modificarse mediante reverso (nuevo asiento inverso)
4. El número de asiento es correlativo por año por organización — nunca se reutiliza
5. Las cuentas con `allowsEntries=false` no aparecen en el select del formulario de asiento
6. Al eliminar una cuenta: solo si no tiene journal lines asociadas

---

## i18n — claves

```json
{
  "accounting": {
    "title": "Contabilidad",
    "journal": "Libro Diario",
    "ledger": "Libro Mayor",
    "balance": "Balances",
    "accounts": "Plan de Cuentas",
    "account_types": {
      "ASSET": "Activo",
      "LIABILITY": "Pasivo",
      "EQUITY": "Patrimonio",
      "REVENUE": "Ingreso",
      "EXPENSE": "Egreso"
    },
    "entry_status": {
      "DRAFT": "Borrador",
      "POSTED": "Contabilizado",
      "REVERSED": "Revertido"
    }
  }
}
```
