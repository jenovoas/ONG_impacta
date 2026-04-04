# M00 — Autenticación y Sesión
## FASE 1

---

## Responsabilidad única (SRP)
Este módulo gestiona exclusivamente: autenticación, sesión, recuperación de contraseña y 2FA.
No gestiona perfil de usuario (eso es M01 Socios/Configuración).

---

## Backend — `apps/api/src/modules/auth/`

### Estructura de archivos
```
auth/
├── auth.module.ts
├── auth.controller.ts
├── auth.service.ts
├── strategies/
│   ├── jwt.strategy.ts          ← valida access token
│   └── jwt-refresh.strategy.ts  ← valida refresh token
├── guards/
│   ├── jwt-auth.guard.ts
│   ├── roles.guard.ts
│   └── permissions.guard.ts
├── decorators/
│   ├── current-user.decorator.ts
│   ├── roles.decorator.ts
│   └── permissions.decorator.ts
└── dto/
    ├── login.dto.ts
    ├── register-org.dto.ts
    ├── forgot-password.dto.ts
    └── reset-password.dto.ts
```

### `TenantMiddleware` — `apps/api/src/common/middleware/tenant.middleware.ts`
```typescript
// Extrae organizationId del JWT y ejecuta:
// SET LOCAL app.current_org_id = 'cuid_de_la_org'
// Esto activa las políticas RLS de PostgreSQL
// Se aplica globalmente en AppModule excepto rutas /auth/login, /auth/register-org
```

### Lógica de negocio
- `login()`: verifica contraseña con argon2.verify() → genera access token (15min) + refresh token (7d)
- `refresh()`: valida refresh token en BD → genera nuevos tokens → invalida el anterior (rotación)
- `logout()`: elimina refresh token de BD
- `forgotPassword()`: genera token UUID, guarda hash en BD, envía email (BullMQ job)
- `resetPassword()`: valida token, actualiza contraseña con argon2.hash(), invalida token
- `register()`: crea Organization + User en transacción, envía email de verificación

### JWT Payload
```typescript
interface JwtPayload {
  sub: string          // userId
  orgId: string        // organizationId
  role: SystemRole     // role del sistema
  permissions: string[] // permisos del rol custom
  iat: number
  exp: number
}
```

---

## Frontend — Pantallas Auth

### A01 — `/auth/login`

**Componentes:**
```
LoginPage
├── Logo (centrado, 120px)
├── Card (max-w-sm, centered)
│   ├── H2 "Iniciar sesión" (font-display)
│   ├── Form (react-hook-form + zod)
│   │   ├── Input email (type="email", label="Email")
│   │   ├── Input password (type="password", label="Contraseña", toggle show/hide)
│   │   ├── Link "¿Olvidaste tu contraseña?" → /auth/recuperar
│   │   └── Button "Iniciar sesión" (full-width, variant="brand")
│   └── Texto "¿Aún no tienes cuenta?" + Link "Regístrate" → /registro
└── ThemeToggle (esquina superior derecha)
```

**Validaciones Zod:**
```typescript
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})
```

**Comportamiento:**
- Error de credenciales: mensaje inline bajo el formulario (no toast)
- Éxito sin 2FA: guardar tokens → redirect a `/dashboard`
- Éxito con 2FA: redirect a `/auth/2fa` con `tempToken` en estado de navegación

---

### A02 — `/auth/recuperar`

```
ForgotPasswordPage
├── Link "← Volver al login"
├── H2 "Recuperar contraseña"
├── P "Ingresa tu email y te enviaremos instrucciones."
├── Form
│   ├── Input email
│   └── Button "Enviar instrucciones"
└── [Estado enviado] Alert success con instrucciones
```

---

### A03 — `/auth/nueva-contrasena`

```
ResetPasswordPage
├── H2 "Nueva contraseña"
├── Form
│   ├── Input password "Nueva contraseña" (mín 8 chars)
│   ├── Input password "Confirmar contraseña"
│   └── Button "Guardar contraseña"
└── [Token inválido/expirado] Alert error + link a /auth/recuperar
```

---

### A04 — `/auth/2fa`

```
TwoFactorPage
├── H2 "Verificación en dos pasos"
├── P "Ingresa el código de tu app autenticadora."
├── Form
│   ├── Input text (6 dígitos, maxLength=6, pattern="[0-9]*", inputMode="numeric")
│   └── Button "Verificar"
└── Link "Usar código de recuperación" (futura implementación)
```

---

## Zustand — `authStore`

```typescript
// src/stores/authStore.ts
interface AuthState {
  user: {
    id: string
    name: string
    email: string
    avatarUrl: string | null
    systemRole: SystemRole
    permissions: string[]
    organization: {
      id: string
      name: string
      slug: string
      plan: Plan
      logoUrl: string | null
    }
  } | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
  hasPermission: (permission: string) => boolean
  hasRole: (role: SystemRole) => boolean
}
```

---

## Permisos — nomenclatura exacta

```
Formato: "{recurso}:{acción}"

members:read          members:write         members:delete
volunteers:read       volunteers:write      volunteers:delete
donations:read        donations:write       donations:delete
events:read           events:write          events:delete
raffles:read          raffles:write         raffles:delete
social_aid:read       social_aid:write      social_aid:delete
ecology:read          ecology:write         ecology:delete
species:read          species:write         species:delete
accounting:read       accounting:write      accounting:close
reports:read          reports:export
settings:read         settings:write
users:read            users:write
```

| Rol | Permisos |
|-----|----------|
| SUPER_ADMIN | Todo |
| ADMIN_ONG | Todo dentro de su ONG |
| COORDINATOR | read/write en módulos operativos, sin accounting ni settings |
| VOLUNTEER | read en events, species, ecology. write en sightings y activities |
| MEMBER | read propio perfil y eventos |
| DONOR | read historial de donaciones propio |
