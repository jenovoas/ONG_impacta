import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
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
        brand: {
          blue:       '#00A8FF',
          'blue-dark':'#0077B6',
          'blue-light':'#80D8FF',
          green:      '#00D4AA',
          'green-dark':'#00A896',
          'green-light':'#80FFDD',
        },
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
      spacing: {
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
          to:   'var(--radix-accordion-content-height)',
        },
        'accordion-up': {
          from: 'var(--radix-accordion-content-height)',
          to:   '0',
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down':  'accordion-down 0.2s ease-out',
        'accordion-up':    'accordion-up 0.2s ease-out',
        'fade-in':         'fade-in 0.15s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
