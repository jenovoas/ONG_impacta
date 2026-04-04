# M12 — Voluntariado Corporativo y Crowdfunding
## FASE 2

---

## M12a — Voluntariado Corporativo

### Responsabilidad única
Portal para gestionar alianzas con empresas que envían grupos de voluntarios.

### Backend
```
GET /corporate                    lista de empresas aliadas
POST /corporate                   registrar empresa
GET /corporate/:id                detalle + jornadas + voluntarios
PATCH /corporate/:id
POST /corporate/:id/activities    registrar jornada corporativa (similar a EcologyActivity)
GET /corporate/:id/report         reporte de participación (PDF)
```

### Frontend — `/corporativo`

```
CorporatePage
├── PageHeader + Button "Nueva empresa aliada"
└── DataTable:
   | Empresa | Contacto | Voluntarios | Jornadas | Última actividad | Estado |

Detalle empresa (/corporativo/:id):
├── Info: nombre, RUT, contacto
├── Jornadas realizadas (Timeline)
├── Total horas voluntariado
└── Button "Descargar reporte de participación"
```

---

## M12b — Crowdfunding y Campañas Virales

### Responsabilidad única
Campañas de donación con funcionalidades virales: embajadores, sharing social, leaderboard.

### Backend
```
POST /crowdfunding                crear campaña crowdfunding
GET /crowdfunding/:id             datos + progreso + top embajadores
POST /crowdfunding/:id/ambassador registrar como embajador
GET /crowdfunding/:id/share/:code tracking de share (redirect + contador)
```

### Frontend — `/crowdfunding`

```
CrowdfundingPage
├── Grid de CrowdfundingCard:
│   - Imagen + título
│   - DonationThermometer
│   - N° embajadores activos
│   - Social share buttons (Twitter, Facebook, WhatsApp)
│   - Button "Ser embajador"
│
└── Detalle campaña (/crowdfunding/:id):
    ├── Hero con termómetro grande
    ├── Button "Compartir" → genera link único por usuario
    ├── Tabs: Detalle | Leaderboard | Mis shares
    │
    └── Tab Leaderboard:
        Top 10 embajadores:
        | Posición | Nombre | Shares | Donaciones generadas |
```

### Reglas de negocio
1. El link de compartir es único por usuario (lleva `?ref=userId`)
2. Al donar via link de embajador: creditar al embajador en el leaderboard
3. El leaderboard se actualiza en tiempo real (WebSocket o polling 30s)
