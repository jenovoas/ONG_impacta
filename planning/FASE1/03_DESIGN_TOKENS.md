# FASE 1 — Design Tokens y Tema
## Impacta+ SaaS

> Archivos afectados:
> - `apps/web/tailwind.config.ts`
> - `apps/web/src/index.css`
> - `apps/landing/tailwind.config.ts`
> - `apps/landing/app/globals.css`
> - `apps/admin/tailwind.config.ts`
> - `apps/admin/src/index.css`
> **Copiar exactamente. No cambiar valores de colores ni tipografía.**

---

## 1. `tailwind.config.ts` (mismo para web, admin y landing)

```typescript
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // ─── Brand ───────────────────────────────────────────
        brand: {
          blue:       '#00A8FF',   // Azul Impacta — primario
          'blue-dark':'#0077B6',   // hover azul
          'blue-light':'#80D8FF',  // highlight azul
          green:      '#00D4AA',   // Verde Restore — acento
          'green-dark':'#00A896',  // hover verde
          'green-light':'#80FFDD',// highlight verde
        },
        // ─── Semánticos (mapean a CSS vars) ──────────────────
        background:     'hsl(var(--background))',
        foreground:     'hsl(var(--foreground))',
        card: {
          DEFAULT:      'hsl(var(--card))',
          foreground:   'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:      'hsl(var(--popover))',
          foreground:   'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT:      'hsl(var(--primary))',
          foreground:   'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:      'hsl(var(--secondary))',
          foreground:   'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:      'hsl(var(--muted))',
          foreground:   'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:      'hsl(var(--accent))',
          foreground:   'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:      'hsl(var(--destructive))',
          foreground:   'hsl(var(--destructive-foreground))',
        },
        border:         'hsl(var(--border))',
        input:          'hsl(var(--input))',
        ring:           'hsl(var(--ring))',
        // ─── Estado ──────────────────────────────────────────
        success: {
          DEFAULT:      '#00D4AA',
          foreground:   '#000000',
          muted:        '#00D4AA1A',
        },
        warning: {
          DEFAULT:      '#FFA502',
          foreground:   '#000000',
          muted:        '#FFA5021A',
        },
        danger: {
          DEFAULT:      '#FF4757',
          foreground:   '#FFFFFF',
          muted:        '#FF47571A',
        },
        info: {
          DEFAULT:      '#00A8FF',
          foreground:   '#000000',
          muted:        '#00A8FF1A',
        },
        // ─── Grises ──────────────────────────────────────────
        gray: {
          900: '#0A0A0A',
          800: '#1A1A1A',
          700: '#2A2A2A',
          600: '#3A3A3A',
          500: '#4A4A4A',
          400: '#6A6A6A',
          300: '#9A9A9A',
          200: '#C0C0C0',
          100: '#E0E0E0',
          50:  '#F5F5F5',
        },
        // ─── Charts ──────────────────────────────────────────
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans:    ['Inter', ...fontFamily.sans],
        display: ['Montserrat', ...fontFamily.sans],
        mono:    ['JetBrains Mono', ...fontFamily.mono],
      },
      fontSize: {
        'display-xl': ['3rem',    { lineHeight: '1.2',  fontWeight: '700' }],  // 48px
        'display-lg': ['2.25rem', { lineHeight: '1.25', fontWeight: '700' }],  // 36px
        'display-md': ['1.75rem', { lineHeight: '1.3',  fontWeight: '600' }],  // 28px
        'display-sm': ['1.5rem',  { lineHeight: '1.35', fontWeight: '600' }],  // 24px
        'body-xl':    ['1.125rem',{ lineHeight: '1.6',  fontWeight: '400' }],  // 18px
        'body-lg':    ['1rem',    { lineHeight: '1.6',  fontWeight: '400' }],  // 16px (base)
        'body-sm':    ['0.875rem',{ lineHeight: '1.5',  fontWeight: '400' }],  // 14px
        'caption':    ['0.75rem', { lineHeight: '1.4',  fontWeight: '400' }],  // 12px
      },
      spacing: {
        // Espaciado base = 4px
        'sidebar':       '240px',
        'sidebar-collapsed': '64px',
        'topbar':        '64px',
        'content-max':   '1280px',
      },
      boxShadow: {
        'card':          '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)',
        'card-hover':    '0 4px 12px rgba(0,168,255,0.15), 0 2px 4px rgba(0,0,0,0.3)',
        'modal':         '0 20px 60px rgba(0,0,0,0.8)',
        'glow-blue':     '0 0 20px rgba(0,168,255,0.3)',
        'glow-green':    '0 0 20px rgba(0,212,170,0.3)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(0,168,255,0)' },
          '50%':      { boxShadow: '0 0 20px rgba(0,168,255,0.4)' },
        },
      },
      animation: {
        'accordion-down':  'accordion-down 0.2s ease-out',
        'accordion-up':    'accordion-up 0.2s ease-out',
        'fade-in':         'fade-in 0.15s ease-out',
        'slide-in-right':  'slide-in-right 0.2s ease-out',
        'pulse-glow':      'pulse-glow 2s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## 2. CSS Variables — Modo Oscuro (default) y Claro

> Archivo: `src/index.css` (web y admin) / `app/globals.css` (landing)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* ─── MODO OSCURO (default) ──────────────────────────── */
  :root {
    /* Fondos */
    --background:            0 0% 0%;       /* #000000 */
    --foreground:            0 0% 100%;     /* #FFFFFF */

    /* Card */
    --card:                  0 0% 10%;      /* #1A1A1A */
    --card-foreground:       0 0% 100%;

    /* Popover / Dropdown */
    --popover:               0 0% 10%;
    --popover-foreground:    0 0% 100%;

    /* Primary = Azul Impacta */
    --primary:               200 100% 50%;  /* #00A8FF */
    --primary-foreground:    0 0% 0%;

    /* Secondary = superficie elevada */
    --secondary:             0 0% 16%;      /* #2A2A2A */
    --secondary-foreground:  0 0% 100%;

    /* Muted */
    --muted:                 0 0% 16%;
    --muted-foreground:      0 0% 60%;      /* #9A9A9A */

    /* Accent = Verde Restore */
    --accent:                168 100% 42%;  /* #00D4AA */
    --accent-foreground:     0 0% 0%;

    /* Destructive */
    --destructive:           354 100% 61%;  /* #FF4757 */
    --destructive-foreground:0 0% 100%;

    /* Borders e inputs */
    --border:                0 0% 23%;      /* #3A3A3A */
    --input:                 0 0% 16%;
    --ring:                  200 100% 50%;  /* foco = azul primario */

    /* Radio de bordes */
    --radius:                0.5rem;

    /* Charts (serie de colores para gráficos) */
    --chart-1:               200 100% 50%;  /* azul */
    --chart-2:               168 100% 42%;  /* verde */
    --chart-3:               38 100% 50%;   /* ámbar */
    --chart-4:               354 100% 61%;  /* rojo */
    --chart-5:               270 100% 70%;  /* violeta */

    /* Sidebar */
    --sidebar-background:    0 0% 5%;       /* #0D0D0D */
    --sidebar-foreground:    0 0% 85%;
    --sidebar-primary:       200 100% 50%;
    --sidebar-accent:        0 0% 10%;
    --sidebar-border:        0 0% 14%;
    --sidebar-ring:          200 100% 50%;
  }

  /* ─── MODO CLARO (class="light") ───────────────────── */
  .light {
    --background:            0 0% 98%;      /* #FAFAFA */
    --foreground:            0 0% 8%;       /* #141414 */

    --card:                  0 0% 100%;
    --card-foreground:       0 0% 8%;

    --popover:               0 0% 100%;
    --popover-foreground:    0 0% 8%;

    --primary:               200 100% 40%;  /* azul más oscuro en claro */
    --primary-foreground:    0 0% 100%;

    --secondary:             0 0% 94%;
    --secondary-foreground:  0 0% 8%;

    --muted:                 0 0% 94%;
    --muted-foreground:      0 0% 40%;

    --accent:                168 100% 32%;
    --accent-foreground:     0 0% 100%;

    --destructive:           354 80% 50%;
    --destructive-foreground:0 0% 100%;

    --border:                0 0% 88%;
    --input:                 0 0% 88%;
    --ring:                  200 100% 40%;

    --sidebar-background:    0 0% 96%;
    --sidebar-foreground:    0 0% 20%;
    --sidebar-primary:       200 100% 40%;
    --sidebar-accent:        0 0% 90%;
    --sidebar-border:        0 0% 84%;
    --sidebar-ring:          200 100% 40%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  h1, h2, h3 {
    @apply font-display;
  }

  /* Scrollbar personalizado */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-background;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-gray-600 rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-500;
  }
}

@layer utilities {
  /* Gradientes de marca */
  .gradient-brand {
    background: linear-gradient(135deg, #00A8FF 0%, #00D4AA 100%);
  }
  .gradient-brand-text {
    background: linear-gradient(135deg, #00A8FF 0%, #00D4AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gradient-dark {
    background: linear-gradient(180deg, #1A1A1A 0%, #000000 100%);
  }

  /* Glassmorphism para cards destacadas */
  .glass {
    background: rgba(26, 26, 26, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .glass-blue {
    background: rgba(0, 168, 255, 0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 168, 255, 0.15);
  }

  /* Truncate con tooltip */
  .truncate-tooltip {
    @apply truncate cursor-default;
  }
}
```

---

## 3. Tokens de Espaciado y Layout

```
Base unit: 4px (= 1 en Tailwind)

Espaciado página:     p-6  (24px)
Gap entre cards:      gap-4 (16px)
Gap entre secciones:  gap-8 (32px)
Padding card:         p-5  (20px)
Sidebar width:        w-60 (240px) / w-16 colapsado (64px)
Topbar height:        h-16 (64px)
Max content width:    max-w-screen-xl (1280px)
Modal max width:      max-w-2xl
Sheet width:          w-[480px]
```

---

## 4. Componentes shadcn/ui — Overrides de tema

> Archivo: `src/components/ui/` (generados por shadcn, no editar directamente)
> Para customizar, crear wrapper en `src/components/` con el mismo nombre.

### Variantes de Button (adicionales a las de shadcn)
```typescript
// Usar cn() para combinar en el componente Button extendido
const buttonVariants = {
  // Existentes en shadcn: default, destructive, outline, secondary, ghost, link
  // Agregar:
  success:  'bg-success text-success-foreground hover:bg-success/90',
  warning:  'bg-warning text-warning-foreground hover:bg-warning/90',
  brand:    'gradient-brand text-white hover:opacity-90 shadow-glow-blue',
}
```

### StatusBadge — variantes exactas
```typescript
const statusVariants = {
  // Member/Volunteer status
  ACTIVE:      'bg-success/10 text-success border border-success/20',
  INACTIVE:    'bg-muted text-muted-foreground border border-border',
  SUSPENDED:   'bg-warning/10 text-warning border border-warning/20',
  DECEASED:    'bg-muted text-muted-foreground border border-border',
  // Payment status
  PAID:        'bg-success/10 text-success border border-success/20',
  PENDING:     'bg-warning/10 text-warning border border-warning/20',
  OVERDUE:     'bg-danger/10 text-danger border border-danger/20',
  CANCELLED:   'bg-muted text-muted-foreground border border-border',
  REFUNDED:    'bg-info/10 text-info border border-info/20',
  // Event/Project status
  DRAFT:       'bg-muted text-muted-foreground border border-border',
  PUBLISHED:   'bg-success/10 text-success border border-success/20',
  COMPLETED:   'bg-info/10 text-info border border-info/20',
  // Task priority
  LOW:         'bg-muted text-muted-foreground',
  MEDIUM:      'bg-info/10 text-info',
  HIGH:        'bg-warning/10 text-warning',
  URGENT:      'bg-danger/10 text-danger',
}
```

---

## 5. Iconografía

Librería: **Lucide Icons** (`lucide-react`)
Tamaño default: `size={16}` en inline, `size={20}` en botones, `size={24}` en headers

```typescript
// Mapa de íconos por módulo — NO cambiar
import {
  Users,           // Socios
  UserCheck,       // Voluntarios
  CalendarDays,    // Calendario
  CheckSquare,     // Tareas
  Heart,           // Donaciones
  Target,          // Campañas
  Ticket,          // Rifas
  CalendarRange,   // Eventos
  HeartHandshake,  // Ayuda Social
  Leaf,            // Ecología
  BookOpen,        // Especies
  BookMarked,      // Biblioteca
  Calculator,      // Contabilidad
  BarChart3,       // Reportes
  Settings,        // Configuración
  Building2,       // ONG / Organización
  ShieldCheck,     // Super Admin
  Globe,           // Landing Page
  Bell,            // Notificaciones
  Search,          // Búsqueda
  Plus,            // Crear nuevo
  Pencil,          // Editar
  Trash2,          // Eliminar
  Eye,             // Ver detalle
  Download,        // Descargar/Exportar
  Upload,          // Subir archivo
  Filter,          // Filtros
  SortAsc,         // Ordenar
  ChevronRight,    // Navegación
  ArrowLeft,       // Volver
  X,               // Cerrar
  Check,           // Confirmación
  AlertCircle,     // Error
  Info,            // Información
  MapPin,          // Ubicación
  QrCode,          // QR Scanner
  Send,            // Enviar
  RefreshCw,       // Refrescar
  LogOut,          // Logout
  Moon,            // Dark mode
  Sun,             // Light mode
  Globe2,          // Idioma
} from 'lucide-react'
```

---

## 6. Tipografía — Aplicación práctica

```
Títulos de página (H1):    font-display text-display-lg font-bold
Subtítulos de sección:     font-display text-display-sm font-semibold
Labels de card/stat:       font-sans text-body-sm text-muted-foreground uppercase tracking-wider
Valores de KPI:            font-display text-display-md font-bold
Texto de tabla:            font-sans text-body-sm
Texto de descripción:      font-sans text-body-lg text-muted-foreground
Código / IDs:              font-mono text-caption
```

---

## 7. Importar fuentes en `index.html` (Vite)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```
