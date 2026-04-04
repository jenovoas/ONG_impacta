# M17 — IA y Analytics Predictivos
## FASE 3

> ⚠️ Alta complejidad. Requiere volumen de datos real (mín. 12 meses de datos en producción).
> No implementar ML custom. Usar APIs externas.

---

## Responsabilidad única
Análisis predictivo de donaciones, detección de churn de socios y asistente conversacional. No reemplaza reportes de M08 — los complementa con predicciones.

---

## Funcionalidades (prioridad orden)

### 1. Predicción de donaciones (Alta)
- **Motor:** AWS Forecast o Google Cloud AI Platform
- **Input:** histórico de donaciones por mes, campaña, tipo
- **Output:** proyección de recaudación próximos 3 meses con intervalo de confianza
- **Pantalla:** `/analytics/predicciones` — gráfico de área con histórico + proyección (línea punteada)

### 2. Alerta de churn de socios (Alta)
- **Motor:** regla simple primero, ML después
- **Lógica simple:** socio con 3+ meses morosos = riesgo alto; 1-2 meses = riesgo medio
- **ML (si hay datos):** modelo de clasificación binaria (churn/no-churn)
- **Pantalla:** widget en `/socios` — badge "En riesgo" + filtro "Socios en riesgo"

### 3. Asistente conversacional (Media)
- **Motor:** Claude API (claude-haiku-4-5 para costo) via `/api/v1/assistant/chat`
- **Contexto:** el asistente recibe datos agregados de la ONG (totales, no PII)
- **Capacidades:**
  - Responder preguntas sobre métricas: "¿Cuánto recaudamos este mes?"
  - Generar resúmenes: "Dame un resumen del estado de mis socios"
  - Sugerir acciones: "¿Qué socios debo contactar esta semana?"
- **Pantalla:** FloatingChat widget en todas las páginas del dashboard

### 4. Dashboard de Analytics (Media)
- **Pantalla:** `/analytics`
- **Widgets:**
  - Mapa de calor de actividad por día/hora
  - Funnel de conversión (visitante → donante → donante recurrente)
  - Segmentación de donantes (RFM: Recency, Frequency, Monetary)
  - Cohort de retención de socios

---

## Backend
```
analytics/
├── analytics.module.ts
├── predictions.controller.ts     ← /analytics/predictions
├── assistant.controller.ts       ← /analytics/assistant/chat
├── predictions.service.ts        ← llama a AWS Forecast / Google AI
├── assistant.service.ts          ← llama a Claude API
└── dto/
    └── chat-message.dto.ts
```

### Endpoint del asistente
```
POST /analytics/assistant/chat
Body: { message: string, history: { role: 'user'|'assistant', content: string }[] }
Response: { reply: string }

El service:
1. Obtiene contexto agregado de la ONG (sin PII): totales de socios, donaciones del mes, etc.
2. Construye system prompt con ese contexto
3. Llama a Claude API con model: claude-haiku-4-5-20251001
4. Retorna la respuesta
```

---

## Reglas de negocio
1. El asistente nunca recibe PII (nombres, RUTs, emails) en el contexto — solo agregados
2. Las predicciones se actualizan semanalmente via job BullMQ (no en tiempo real)
3. Si no hay suficientes datos (< 6 meses): mostrar mensaje "Se necesitan más datos para predicciones precisas"
4. El costo de la API de IA se incluye en el plan PRO y Enterprise únicamente
