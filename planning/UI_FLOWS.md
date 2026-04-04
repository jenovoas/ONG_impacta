# Flujos de Usuario — Impacta+ Frontend
## Fase 1 MVP

---

## 1. Flujo de Autenticación

```
Visitante
  │
  ├─► /auth/login
  │     ├─ Credenciales válidas + sin 2FA → /dashboard
  │     ├─ Credenciales válidas + 2FA activo → /auth/2fa → /dashboard
  │     ├─ Credenciales inválidas → error inline (no toast)
  │     └─ "Olvidé contraseña" → /auth/recuperar
  │
  └─► /auth/recuperar
        ├─ Email enviado → mensaje de confirmación
        └─ Link de email → /auth/nueva-contrasena → /auth/login

Sesión expirada (access token vencido)
  → Refresh token automático en background
  → Si refresh también expiró → redirect a /auth/login (conservar URL de retorno)
```

---

## 2. Flujo: Registro de Nueva ONG

```
Landing /registro
  │
  Step 1: Datos de la organización
    - Nombre legal, RUT, tipo de ONG
    - Dirección, región, comuna
    - Teléfono, email institucional
  │
  Step 2: Cuenta del administrador
    - Nombre, email, contraseña
    - Cargo dentro de la organización
  │
  Step 3: Plan (Free por defecto)
    - Ver comparativa de planes
    - Si elige plan de pago → flujo de pago
  │
  Step 4: Confirmación
    - Email de verificación enviado
    - Redirect → /auth/login con mensaje de bienvenida
```

---

## 3. Flujo: Gestión de Socio (Admin/Coordinador)

```
/socios (lista)
  │
  ├─► Nuevo socio → /socios/nuevo
  │     Step 1: Datos personales (nombre, RUT, email, teléfono, dirección)
  │     Step 2: Membresía (tipo, cuota mensual, fecha inicio)
  │     Step 3: Roles y cargos dentro de la ONG
  │     → Guardar → /socios/[id] con toast "Socio creado"
  │
  ├─► Ver socio → /socios/[id]
  │     Tabs:
  │       - Información personal
  │       - Membresía y cuotas (estado, historial de pagos)
  │       - Tareas asignadas
  │       - Participación en eventos
  │       - Historial de actividad
  │     Acciones: Editar | Desactivar | Emitir certificado | Registrar pago
  │
  └─► Editar → /socios/[id]/editar → mismo formulario pre-cargado
```

---

## 4. Flujo: Donación Online (Donante externo)

```
Landing ONG (pública)
  │
  ├─► Botón "Donar ahora"
  │     Modal o página /donar
  │       - Monto (sugeridos: $5.000 / $10.000 / $20.000 / libre)
  │       - Frecuencia: única / mensual / anual
  │       - Datos: nombre, email, RUT (para certificado)
  │       - Método de pago: MercadoPago | PayPal | Stripe
  │       → Redirect pasarela de pago
  │       → Callback exitoso → página de agradecimiento + email automático
  │       → Callback fallido → error con opción de reintentar
  │
  └─► Desde campaña específica
        - Mismo flujo con campaña pre-seleccionada
        - Termómetro actualizado en tiempo real (WebSocket)
```

---

## 5. Flujo: Crear y Gestionar Evento

```
/eventos/nuevo (Admin/Coordinador)
  │
  Step 1: Información básica
    - Nombre, descripción, tipo de evento
    - Fecha inicio/fin, lugar, capacidad máxima
    - Imagen portada
  │
  Step 2: Configuración de recaudación (opcional)
    - Activar termómetro: Sí/No
    - Meta de recaudación, plazo
    - Precio de entrada (gratis o con costo)
  │
  Step 3: Inscripciones
    - Inscripción abierta / solo por invitación
    - Campos extra del formulario de inscripción
  │
  Publicar → evento visible en landing pública ONG
  │
  Día del evento → /eventos/[id]/checkin
    - QR scanner para check-in rápido
    - Lista manual con búsqueda
    - Contador en tiempo real de asistentes
```

---

## 6. Flujo: Rifa Digital

```
/rifas/nueva
  │
  Step 1: Configuración
    - Nombre, descripción, premios
    - Precio por boleto, cantidad total
    - Fecha límite de venta, fecha de sorteo
  │
  Step 2: Publicar rifa
    - Disponible en landing pública
    - Boletos con numeración automática
  │
  Compra de boleto (usuario externo)
    - Selecciona número(s) o aleatorio
    - Pago integrado
    - Boleto enviado por email con QR
  │
  Sorteo → /rifas/[id]/sorteo
    - Animación de sorteo (aleatorio verificable)
    - Acta digital generada automáticamente
    - Notificación automática al ganador
```

---

## 7. Flujo: Entrega de Ayuda Social

```
/ayuda-social (lista beneficiarios)
  │
  ├─► Nuevo beneficiario → /ayuda-social/nuevo
  │     - Datos personales, composición familiar
  │     - Situación (económica, habitacional, salud)
  │     - Tipo de ayuda requerida
  │
  └─► Registrar entrega → /ayuda-social/[id]/entrega
        - Seleccionar tipo de ayuda
        - Cantidad / descripción de lo entregado
        - Voluntario responsable
        - Foto de evidencia (upload)
        - Firma digital del receptor
        → Guardar → historial actualizado
```

---

## 8. Flujo: Registro de Avistamiento de Especie

```
/especies/avistamientos/nuevo (Voluntario o Admin)
  │
  - Buscar especie (SearchableSelect del catálogo)
    └─ Si no existe → "Agregar nueva especie" → /especies/nueva
  - Ubicación: GPS automático o mapa manual
  - Fecha y hora
  - Cantidad de individuos observados
  - Condición: adulto/juvenil/cría, estado de salud
  - Fotos (hasta 5)
  - Notas adicionales
  │
  → Guardar → punto en mapa + actualización seguimiento de población
```

---

## 9. Flujo: Asiento Contable

```
/contabilidad/diario/nuevo (Admin/Tesorero)
  │
  - Fecha del asiento
  - Descripción / glosa
  - Centro de costo (opcional)
  - Filas del asiento:
      [Cuenta (árbol)] [Descripción] [Debe] [Haber]
      + Botón "Agregar fila"
  │
  Validación en tiempo real:
    - ∑ Debe = ∑ Haber (partida doble)
    - Si no cuadra → error visible, no permite guardar
  │
  → Guardar → libro diario actualizado, mayor recalculado
```

---

## 10. Navegación por Rol

| Módulo sidebar | Super Admin | Admin ONG | Coordinador | Voluntario | Socio |
|----------------|:-----------:|:---------:|:-----------:|:----------:|:-----:|
| Dashboard | ✓ | ✓ | ✓ | ✓ | ✓ |
| Socios | — | ✓ | ✓ | — | — |
| Voluntarios | — | ✓ | ✓ | — | — |
| Calendario/Tareas | — | ✓ | ✓ | ✓ | — |
| Donaciones/Pagos | — | ✓ | — | — | ✓* |
| Eventos | — | ✓ | ✓ | ✓ | ✓* |
| Rifas | — | ✓ | ✓ | — | ✓* |
| Ayuda Social | — | ✓ | ✓ | ✓ | — |
| Ecología | — | ✓ | ✓ | ✓ | — |
| Especies | — | ✓ | ✓ | ✓ | — |
| Contabilidad | — | ✓ | — | — | — |
| Reportes | — | ✓ | ✓** | — | — |
| Configuración | — | ✓ | — | — | — |
| Panel ONGs | ✓ | — | — | — | — |

`*` = vista de solo lectura / portal propio
`**` = reportes limitados a su área

---

## 11. Estados de Error Globales

| Error | Comportamiento |
|-------|---------------|
| 401 Unauthorized | Redirect `/auth/login` conservando URL |
| 403 Forbidden | Pantalla "Sin permisos" con botón volver |
| 404 Not Found | Pantalla 404 con búsqueda y accesos rápidos |
| 500 Server Error | Toast de error + opción de reportar |
| Sin conexión | Banner persistente "Sin conexión. Los cambios se guardarán cuando vuelvas a conectarte." |
| Sesión en otro dispositivo | Modal de aviso (no logout forzado) |
