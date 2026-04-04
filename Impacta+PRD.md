# Documento de Requisitos de Producto (PRD)
## ONG Impacta+ — Landing Page

| **Versión** | 1.0 |
|-------------|-----|
| **Estado** | Borrador |
| **Fecha** | 4 de abril de 2026 |
| **Responsable** | Equipo de Desarrollo |

---

## 1. Resumen Ejecutivo

### 1.1 Propósito
Desarrollar una landing page profesional para la ONG Impacta+ que permita dar a conocer la organización, sus programas y facilitar la participación de voluntarios y donantes.

### 1.2 Antecedentes
Impacta+ es una organización sin fines de lucro dedicada a brindar apoyo y recursos a comunidades vulnerables a través de programas educativos, de salud y desarrollo comunitario. Actualmente cuenta con presencia en Facebook pero requiere una plataforma web propia para centralizar información y facilitar la interacción con su audiencia.

### 1.3 Perfil de la Organización
- **Nombre:** ONG Impacta+
- **Facebook:** [Impacta+](https://web.facebook.com/profile.php?id=100090404104178)
- **Misión:** Mejorar la calidad de vida de personas en situación de vulnerabilidad
- **Valores:** Inclusión, colaboración, empoderamiento comunitario, impacto positivo

---

## 2. Objetivos del Producto

### 2.1 Objetivo Principal
Crear una plataforma web que visibilice el trabajo de Impacta+ y facilite los canales de participación (voluntariado, donaciones, contacto).

### 2.2 Objetivos Específicos
| ID | Objetivo | Prioridad |
|----|----------|-----------|
| OE1 | Informar sobre la misión, visión y programas de la ONG | Alta |
| OE2 | Facilitar el registro de voluntarios | Alta |
| OE3 | Habilitar canal de donaciones en línea | Alta |
| OE4 | Centralizar información de contacto y redes sociales | Alta |
| OE5 | Mostrar el impacto concreto de los programas | Media |
| OE6 | Mantener a la comunidad informada (noticias/eventos) | Media |

---

## 3. Alcance del Producto

### 3.1 Funcionalidades Principales

#### 3.1.1 Secciones Informativas
| Sección | Descripción | Prioridad |
|---------|-------------|-----------|
| **Inicio** | Hero section con llamado a la acción principal | Alta |
| **Quiénes Somos** | Historia, misión, visión y valores de la ONG | Alta |
| **Nuestros Programas** | Descripción de programas educativos, de salud y desarrollo comunitario | Alta |
| **Impacto** | Estadísticas y resultados concretos de los programas | Alta |
| **Cómo Ayudar** | Opciones de voluntariado y donaciones | Alta |
| **Noticias/Blog** | Actualizaciones, logros e historias inspiradoras | Media |
| **Eventos** | Calendario de actividades, talleres y campañas | Media |
| **Recursos** | Materiales educativos y guías de salud | Baja |
| **FAQ** | Preguntas frecuentes sobre la ONG y programas | Media |
| **Contacto** | Formulario e información de contacto | Alta |

#### 3.1.2 Funcionalidades Interactivas
| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| **Formulario de Contacto** | Envío de consultas e interés en apoyar | Alta |
| **Registro de Voluntarios** | Formulario específico para postulantes | Alta |
| **Sistema de Donaciones** | Donaciones únicas y recurrentes en línea | Alta |
| **Calendario de Eventos** | Visualización de próximas actividades | Media |
| **Galería Multimedia** | Fotos y videos de actividades | Media |
| **Testimonios** | Historias de beneficiados (texto y video) | Media |
| **Integración Redes Sociales** | Enlaces y feed de Facebook | Alta |

#### 3.1.3 Secciones de Reconocimiento
| Sección | Descripción | Prioridad |
|---------|-------------|-----------|
| **Voluntarios Destacados** | Perfiles de voluntarios con contribución significativa | Baja |
| **Alianzas** | Organizaciones y empresas colaboradoras | Media |

---

## 4. Requisitos Técnicos

### 4.1 Requisitos No Funcionales

| ID | Requisito | Descripción |
|----|-----------|-------------|
| RNF1 | **Responsive Design** | La página debe adaptarse a todos los dispositivos (móvil, tablet, desktop) |
| RNF2 | **Performance** | Tiempo de carga máximo de 3 segundos |
| RNF3 | **SEO** | Optimización para motores de búsqueda (meta tags, estructura semántica) |
| RNF4 | **Accesibilidad** | Cumplimiento WCAG 2.1 nivel AA mínimo |
| RNF5 | **Seguridad** | Certificado SSL, protección de formularios contra spam |
| RNF6 | **Navegabilidad** | Menú intuitivo, máximo 3 clics para llegar a cualquier sección |

### 4.2 Requisitos de Contenido

| ID | Requisito |
|----|-----------|
| RC1 | Incluir imágenes relevantes del trabajo de la ONG |
| RC2 | Redacción clara, concisa y con llamado a la acción |
| RC3 | Contenido disponible en español |
| RC4 | Mantener coherencia con la identidad visual de la organización |

---

## 5. Arquitectura de Información

```
┌─────────────────────────────────────────────────────┐
│                    HEADER / NAV                     │
│  Logo  |  Inicio  Programas  Impacto  Cómo Ayudar   │
│          Noticias  Eventos  Recursos  Contacto      │
├─────────────────────────────────────────────────────┤
│                      HERO SECTION                   │
│         "Juntos podemos hacer una diferencia"       │
│              [Botón: Quiero Ayudar]                 │
├─────────────────────────────────────────────────────┤
│                  QUIÉNES SOMOS                      │
│     Historia | Misión | Visión | Valores            │
├─────────────────────────────────────────────────────┤
│                  NUESTROS PROGRAMAS                 │
│   Educación | Salud | Desarrollo Comunitario        │
├─────────────────────────────────────────────────────┤
│                     IMPACTO                         │
│        Estadísticas | Resultados | Testimonios      │
├─────────────────────────────────────────────────────┤
│                   CÓMO AYUDAR                       │
│      Voluntariado | Donaciones | Alianzas           │
├─────────────────────────────────────────────────────┤
│                   NOTICIAS/BLOG                     │
│           Últimas actividades y logros              │
├─────────────────────────────────────────────────────┤
│                     EVENTOS                         │
│         Calendario de próximas actividades          │
├─────────────────────────────────────────────────────┤
│                    CONTACTO                         │
│   Formulario | Email | Teléfono | Dirección         │
├─────────────────────────────────────────────────────┤
│                    FOOTER                           │
│   Redes Sociales | Links Rápidos | © 2026 Impacta+  │
└─────────────────────────────────────────────────────┘
```

---

## 6. Criterios de Aceptación

### 6.1 Criterios Generales
- [ ] La página carga en menos de 3 segundos en conexión 4G
- [ ] El diseño es responsive y se prueba en 3 breakpoints mínimo
- [ ] Todos los formularios envían datos correctamente
- [ ] Los enlaces a redes sociales funcionan
- [ ] El sitio es navegable con teclado (accesibilidad)
- [ ] Las imágenes tienen texto alternativo descriptivo

### 6.2 Criterios Específicos por Funcionalidad

#### Formulario de Contacto
- [ ] Campos requeridos validados
- [ ] Mensaje de confirmación al enviar
- [ ] Notificación por email al administrador

#### Registro de Voluntarios
- [ ] Formulario con datos personales y áreas de interés
- [ ] Confirmación de recepción
- [ ] Los datos se almacenan de forma segura

#### Donaciones
- [ ] Integración con pasarela de pago segura
- [ ] Opción de donación única y recurrente
- [ ] Comprobante de donación por email

---

## 7. Métricas de Éxito

| Métrica | Objetivo | Herramienta de Medición |
|---------|----------|------------------------|
| Visitas mensuales | 1,000+ en los primeros 3 meses | Google Analytics |
| Tasa de rebote | < 40% | Google Analytics |
| Registros de voluntarios | 20+ mensuales | Formulario |
| Donaciones en línea | 10+ mensuales | Plataforma de pagos |
| Tiempo en página | > 2 minutos promedio | Google Analytics |

---

## 8. Cronograma Tentativo

| Fase | Duración | Entregables |
|------|----------|-------------|
| **Diseño UI/UX** | 1-2 semanas | Wireframes, Mockups |
| **Desarrollo Frontend** | 2-3 semanas | Página funcional |
| **Integración Backend** | 1-2 semanas | Formularios, Donaciones |
| **Testing** | 1 semana | Reporte de pruebas |
| **Lanzamiento** | 1 semana | Deploy y capacitación |

**Total estimado:** 6-9 semanas

---

## 9. Riesgos y Dependencias

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retraso en entrega de contenido | Media | Alto | Establecer fechas límite claras |
| Cambios en requisitos | Media | Medio | Congelar requisitos antes de desarrollo |
| Limitaciones de presupuesto | Baja | Alto | Priorizar funcionalidades MVP |
| Dependencia de terceros (pasarela de pago) | Media | Medio | Evaluar múltiples proveedores |

---

## 10. Glosario

| Término | Definición |
|---------|------------|
| **Landing Page** | Página de aterrizaje diseñada para convertir visitantes |
| **Responsive** | Diseño que se adapta a diferentes tamaños de pantalla |
| **SEO** | Search Engine Optimization, optimización para buscadores |
| **WCAG** | Web Content Accessibility Guidelines |
| **MVP** | Minimum Viable Product, producto mínimo viable |

---

## 11. Aprobaciones

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| Product Owner | | | |
| Stakeholder | | | |
| Tech Lead | | | |

---

*Documento elaborado para el proyecto de desarrollo web de ONG Impacta+*
