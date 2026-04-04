# Documento de Diseño e Identidad Visual
## ONG Impacta+ — Sistema de Gestión SaaS

| **Versión** | 1.0 |
|-------------|-----|
| **Fecha** | 4 de abril de 2026 |
| **Estado** | En desarrollo |

---

## 1. Paleta de Colores Corporativa

### 1.1 Colores Principales

| Color | Nombre | HEX | RGB | HSL | Uso |
|-------|--------|-----|-----|-----|-----|
| ![Negro](https://via.placeholder.com/50/000000/000000) | **Negro Base** | `#000000` | rgb(0, 0, 0) | hsl(0, 0%, 0%) | Fondos principales, texto oscuro |
| ![Blanco](https://via.placeholder.com/50/FFFFFF/FFFFFF) | **Blanco Puro** | `#FFFFFF` | rgb(255, 255, 255) | hsl(0, 0%, 100%) | Texto principal, iconos, contrastes |
| ![Azul Impacta](https://via.placeholder.com/50/00A8FF/00A8FF) | **Azul Impacta** | `#00A8FF` | rgb(0, 168, 255) | hsl(200°, 100%, 50%) | Color primario, CTAs, enlaces |
| ![Verde Restore](https://via.placeholder.com/50/00D4AA/00D4AA) | **Verde Restore** | `#00D4AA` | rgb(0, 212, 170) | hsl(168°, 100%, 42%) | Acentos, éxitos, símbolo + |

### 1.2 Colores Secundarios (Derivados)

| Color | Nombre | HEX | Uso |
|-------|--------|-----|-----|
| ![Azul Oscuro](https://via.placeholder.com/50/0077B6/0077B6) | Azul Profundo | `#0077B6` | Hover azul, estados activos |
| ![Azul Claro](https://via.placeholder.com/50/80D8FF/80D8FF) | Azul Cielo | `#80D8FF` | Fondos suaves, highlights |
| ![Verde Oscuro](https://via.placeholder.com/50/00A896/00A896) | Verde Bosque | `#00A896` | Hover verde, estados secundarios |
| ![Verde Claro](https://via.placeholder.com/50/80FFDD/80FFDD) | Verde Menta | `#80FFDD` | Fondos ecológicos, badges |
| ![Gris Oscuro](https://via.placeholder.com/50/1A1A1A/1A1A1A) | Gris Carbón | `#1A1A1A` | Fondos alternativos |
| ![Gris Medio](https://via.placeholder.com/50/4A4A4A/4A4A4A) | Gris Piedra | `#4A4A4A` | Texto secundario |
| ![Gris Claro](https://via.placeholder.com/50/E0E0E0/E0E0E0) | Gris Nube | `#E0E0E0` | Bordes, separadores |

### 1.3 Paleta Semántica

| Tipo | Color | HEX | Uso |
|------|-------|-----|-----|
| **Éxito** | Verde Restore | `#00D4AA` | Confirmaciones, completado |
| **Error** | Rojo Alerta | `#FF4757` | Errores, eliminaciones |
| **Advertencia** | Ámbar | `#FFA502` | Alertas, precauciones |
| **Información** | Azul Impacta | `#00A8FF` | Info, tooltips |
| **Neutro** | Gris Piedra | `#4A4A4A` | Estados neutros |

---

## 2. Tipografía

### 2.1 Fuente Principal

**Inter** (Google Fonts)
- Moderna, legible, optimizada para UI
- Pesos: 300, 400, 500, 600, 700

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### 2.2 Fuente Secundaria (Títulos/Logo)

**Montserrat** (Google Fonts)
- Impactante para títulos y branding
- Pesos: 600, 700, 800

```css
font-family: 'Montserrat', sans-serif;
```

### 2.3 Escala Tipográfica

| Elemento | Tamaño | Peso | Line-height |
|----------|--------|------|-------------|
| H1 | 48px (3rem) | 700 | 1.2 |
| H2 | 36px (2.25rem) | 700 | 1.25 |
| H3 | 28px (1.75rem) | 600 | 1.3 |
| H4 | 24px (1.5rem) | 600 | 1.35 |
| H5 | 20px (1.25rem) | 600 | 1.4 |
| H6 | 16px (1rem) | 600 | 1.5 |
| Body | 16px (1rem) | 400 | 1.6 |
| Small | 14px (0.875rem) | 400 | 1.5 |
| Caption | 12px (0.75rem) | 400 | 1.4 |

---

## 3. Sistema de Espaciado

Base: **8px**

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | 4px | Micro espaciado |
| `--space-2` | 8px | Espaciado base |
| `--space-3` | 12px | Espaciado pequeño |
| `--space-4` | 16px | Espaciado estándar |
| `--space-5` | 24px | Espaciado medio |
| `--space-6` | 32px | Espaciado grande |
| `--space-8` | 48px | Espaciado XL |
| `--space-10` | 64px | Espaciado XXL |
| `--space-12` | 96px | Espaciado XXXL |

---

## 4. Sistema de Bordes

### 4.1 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 4px | Botones pequeños, inputs |
| `--radius-md` | 8px | Botones estándar, cards |
| `--radius-lg` | 12px | Cards grandes, modales |
| `--radius-xl` | 16px | Contenedores destacados |
| `--radius-full` | 9999px | Avatares, badges, pills |

### 4.2 Bordes y Sombras

```css
/* Bordes */
--border-subtle: 1px solid rgba(255, 255, 255, 0.1);
--border-default: 1px solid #E0E0E0;
--border-strong: 2px solid #00A8FF;

/* Sombras (modo oscuro) */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);

/* Sombras con color de marca */
--shadow-primary: 0 4px 14px rgba(0, 168, 255, 0.4);
--shadow-success: 0 4px 14px rgba(0, 212, 170, 0.4);
```

---

## 5. Componentes UI

### 5.1 Botones

```css
/* Botón Primario */
.btn-primary {
  background: #00A8FF;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #0077B6;
  box-shadow: 0 4px 14px rgba(0, 168, 255, 0.4);
  transform: translateY(-1px);
}

/* Botón Secundario */
.btn-secondary {
  background: transparent;
  color: #00A8FF;
  border: 2px solid #00A8FF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}

/* Botón Verde (Éxito/Donar) */
.btn-success {
  background: #00D4AA;
  color: #FFFFFF;
}

.btn-success:hover {
  background: #00A896;
  box-shadow: 0 4px 14px rgba(0, 212, 170, 0.4);
}
```

### 5.2 Cards

```css
.card {
  background: #1A1A1A;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.card-highlight {
  border-color: #00A8FF;
  box-shadow: 0 4px 14px rgba(0, 168, 255, 0.2);
}
```

### 5.3 Inputs

```css
.input {
  background: #1A1A1A;
  border: 1px solid #4A4A4A;
  border-radius: 8px;
  padding: 12px 16px;
  color: #FFFFFF;
  font-size: 16px;
}

.input:focus {
  outline: none;
  border-color: #00A8FF;
  box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.2);
}
```

---

## 6. Aplicación de Marca

### 6.1 Logo

El logo de Impacta+ consiste en:
- Texto "ONG" en blanco
- "IMPACTA" en Azul Impacta (#00A8FF)
- Símbolo "+" en Verde Restore (#00D4AA) con efecto brush
- Tagline "Restaurando Nuestro Planeta" en blanco

### 6.2 Uso del Símbolo +

El símbolo "+" representa:
- **Positivo**: Impacto positivo
- **Suma**: Sumar esfuerzos
- **Cruz**: Ayuda, salud, esperanza
- **Intersección**: Unión de voluntades

### 6.3 Aplicaciones

| Medio | Fondo | Logo |
|-------|-------|------|
| Web | Negro/Gris oscuro | Blanco + Azul + Verde |
| Documentos | Blanco | Versión completa |
| Merchandising | Variable | Según contraste |
| Redes Sociales | Gradiente | Blanco simplificado |

---

## 7. Gradientes

```css
/* Gradiente Principal */
.gradient-primary {
  background: linear-gradient(135deg, #00A8FF 0%, #00D4AA 100%);
}

/* Gradiente Oscuro */
.gradient-dark {
  background: linear-gradient(180deg, #1A1A1A 0%, #000000 100%);
}

/* Gradiente Hero */
.gradient-hero {
  background: linear-gradient(135deg, #000000 0%, #0a1628 50%, #001a28 100%);
}

/* Gradiente Éxito */
.gradient-success {
  background: linear-gradient(135deg, #00D4AA 0%, #00A896 100%);
}
```

---

## 8. Iconografía

### 8.1 Estilo

- **Lineales**: Trazo de 2px, bordes redondeados
- **Relleno**: Para estados activos/importantes
- **Tamaño base**: 24x24px

### 8.2 Librerías Recomendadas

- **Lucide Icons** (principal)
- **Heroicons** (alternativa)
- **FontAwesome** (iconos especializados)

### 8.3 Colores de Iconos

| Contexto | Color |
|----------|-------|
| Normal | #FFFFFF |
| Secundario | #4A4A4A |
| Primario | #00A8FF |
| Éxito | #00D4AA |
| Advertencia | #FFA502 |
| Error | #FF4757 |

---

## 9. Accesibilidad

### 9.1 Contraste

Todos los colores deben cumplir WCAG 2.1 AA:

| Combinación | Ratio | Estado |
|-------------|-------|--------|
| Blanco / Negro | 21:1 | ✅ AAA |
| Blanco / Azul Impacta | 3.5:1 | ✅ AA |
| Blanco / Verde Restore | 2.5:1 | ⚠️ Usar solo en grandes superficies |
| Negro / Gris Claro | 12:1 | ✅ AAA |

### 9.2 Estados de Focus

```css
:focus-visible {
  outline: 2px solid #00A8FF;
  outline-offset: 2px;
}
```

---

## 10. Variables CSS (Design Tokens)

```css
:root {
  /* Colores */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-primary: #00A8FF;
  --color-primary-dark: #0077B6;
  --color-primary-light: #80D8FF;
  --color-accent: #00D4AA;
  --color-accent-dark: #00A896;
  --color-accent-light: #80FFDD;
  
  /* Grises */
  --color-gray-900: #1A1A1A;
  --color-gray-700: #4A4A4A;
  --color-gray-300: #E0E0E0;
  --color-gray-100: #F5F5F5;
  
  /* Semánticos */
  --color-success: #00D4AA;
  --color-error: #FF4757;
  --color-warning: #FFA502;
  --color-info: #00A8FF;
  
  /* Tipografía */
  --font-primary: 'Inter', sans-serif;
  --font-display: 'Montserrat', sans-serif;
  
  /* Espaciado */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-8: 48px;
  --space-10: 64px;
  --space-12: 96px;
  
  /* Bordes */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
}
```

---

## 11. Ejemplos de Aplicación

### 11.1 Dashboard

- Fondo: Negro (#000000)
- Cards: Gris Carbón (#1A1A1A)
- Métricas destacadas: Azul Impacta (#00A8FF)
- Estados positivos: Verde Restore (#00D4AA)

### 11.2 Landing Page

- Hero: Gradiente oscuro
- CTAs principales: Azul Impacta
- CTAs secundarios: Verde Restore (Donar)
- Texto: Blanco

### 11.3 Formularios

- Fondos: Gris Carbón (#1A1A1A)
- Bordes: Gris Piedra (#4A4A4A)
- Focus: Azul Impacta con glow
- Error: Rojo Alerta (#FF4757)

---

*Documento de diseño para el sistema SaaS de ONG Impacta+*
