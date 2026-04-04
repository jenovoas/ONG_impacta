# Arquitectura de Aplicación Móvil e Internacionalización

## ONG Impacta+ SaaS

| **Versión** | 1.0 |
|-------------|-----|
| **Fecha** | 4 de abril de 2026 |
| **Estado** | En desarrollo |

---

## 1. Aplicación Móvil

### 1.1 Stack Tecnológico

| Tecnología | Propósito |
|------------|-----------|
| **React Native** | Framework principal multi-plataforma |
| **Expo SDK 50+** | Herramientas de desarrollo y build |
| **TypeScript** | Tipado estático |
| **Expo Router** | Navegación basada en archivos |
| **Zustand** | Estado global |
| **TanStack Query** | Data fetching y cache |
| **React Hook Form + Zod** | Formularios y validación |
| **Expo SecureStore** | Almacenamiento seguro (tokens) |
| **Expo Image Picker** | Selección de imágenes |
| **Expo Location** | Geolocalización |
| **Expo BarCode Scanner** | Escaneo QR |
| **Expo Notifications** | Notificaciones locales |
| **Firebase Cloud Messaging** | Push notifications |
| **react-i18next** | Internacionalización |

### 1.2 Estructura del Proyecto

```
apps/mobile/
├── app/                          # Expo Router (pantallas)
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (main)/
│   │   ├── index.tsx             # Dashboard
│   │   ├── tasks/
│   │   │   ├── index.tsx         # Lista de tareas
│   │   │   ├── [id].tsx          # Detalle de tarea
│   │   │   └── create.tsx
│   │   ├── events/
│   │   │   ├── index.tsx
│   │   │   └── [id].tsx
│   │   ├── profile.tsx
│   │   └── settings.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── calendar.tsx
│   │   ├── notifications.tsx
│   │   └── more.tsx
│   └── _layout.tsx
├── components/
│   ├── ui/                       # Componentes base
│   ├── tasks/                    # Componentes de tareas
│   ├── events/                   # Componentes de eventos
│   └── common/                   # Componentes compartidos
├── hooks/
│   ├── useAuth.ts
│   ├── useTasks.ts
│   ├── useEvents.ts
│   ├── useLocale.ts
│   └── usePushNotifications.ts
├── services/
│   ├── api.ts
│   ├── auth.service.ts
│   ├── tasks.service.ts
│   ├── events.service.ts
│   └── push.service.ts
├── stores/
│   ├── auth.store.ts
│   ├── tasks.store.ts
│   └── settings.store.ts
├── locales/
│   ├── index.ts
│   ├── es.json
│   └── en.json
├── utils/
│   ├── formatters.ts
│   ├── validators.ts
│   └── offline-sync.ts
├── types/
│   ├── api.types.ts
│   ├── task.types.ts
│   └── user.types.ts
├── constants/
│   ├── colors.ts
│   ├── config.ts
│   └── theme.ts
├── app.json                      # Configuración Expo
├── package.json
└── tsconfig.json
```

### 1.3 Funcionalidades Principales

#### 1.3.1 Asignación de Carga de Trabajo

```typescript
// types/task.types.ts
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'BLOCKED' | 'COMPLETED';
  dueDate: string;
  assignedTo: User[];
  createdBy: User;
  estimatedHours?: number;
  loggedHours?: number;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  attachments: Attachment[];
  checkList: CheckListItem[];
}

// components/tasks/TaskCard.tsx
function TaskCard({ task }: { task: Task }) {
  const { t } = useTranslation();
  
  return (
    <Card>
      <View style={styles.header}>
        <PriorityBadge priority={task.priority} />
        <Text>{task.title}</Text>
        <DueDate date={task.dueDate} />
      </View>
      
      <ProgressBar 
        completed={task.checkList.filter(i => i.completed).length}
        total={task.checkList.length}
      />
      
      <View style={styles.footer}>
        <AssignedUsers users={task.assignedTo} />
        <LocationBadge location={task.location} />
      </View>
    </Card>
  );
}
```

#### 1.3.2 Reporte en Línea

```typescript
// app/(main)/tasks/[id]/report.tsx
export default function TaskReportScreen({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { takePhoto } = useCamera();
  const { submitReport } = useTaskReports();

  const form = useForm({
    schema: z.object({
      status: z.enum(['IN_PROGRESS', 'COMPLETED', 'BLOCKED']),
      comment: z.string().optional(),
      photos: z.array(z.string()).optional(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }).optional(),
      hoursWorked: z.number().min(0).optional(),
    }),
  });

  const handleSubmit = async (data) => {
    await submitReport.mutateAsync({
      taskId: params.id,
      ...data,
      location: location.coords,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <ScrollView>
      <StatusSelector control={form.control} />
      <CommentInput control={form.control} />
      <PhotoUploader control={form.control} onTakePhoto={takePhoto} />
      <HoursWorkedInput control={form.control} />
      <CurrentLocation location={location.coords} />
      <Button onPress={form.handleSubmit(handleSubmit)}>
        {t('tasks.report.submit')}
      </Button>
    </ScrollView>
  );
}
```

#### 1.3.3 Check-in/Check-out

```typescript
// app/(main)/events/[id]/checkin.tsx
export default function EventCheckInScreen({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const { checkIn, checkOut } = useEventAttendance();
  const location = useLocation();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = async () => {
    await checkIn.mutateAsync({
      eventId: params.id,
      location: location.coords,
      timestamp: new Date().toISOString(),
    });
    setIsCheckedIn(true);
  };

  const handleCheckOut = async () => {
    await checkOut.mutateAsync({
      eventId: params.id,
      location: location.coords,
      timestamp: new Date().toISOString(),
    });
    setIsCheckedIn(false);
  };

  return (
    <View style={styles.container}>
      <EventInfo eventId={params.id} />
      
      {!isCheckedIn ? (
        <Button 
          onPress={handleCheckIn} 
          icon="login"
          size="large"
        >
          {t('events.checkin')}
        </Button>
      ) : (
        <Button 
          onPress={handleCheckOut} 
          variant="outline"
          icon="logout"
          size="large"
        >
          {t('events.checkout')}
        </Button>
      )}
      
      <CurrentTime />
      <LocationDisplay coords={location.coords} />
    </View>
  );
}
```

#### 1.3.4 Notificaciones Push

```typescript
// services/push.service.ts
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#00A8FF',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Permiso de notificaciones no concedido');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    })).data;
    
    // Guardar token en backend
    await savePushTokenToBackend(token);
    
    return token;
  }
}

// handlers de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    const isForeground = notification.request.trigger.type === 'push';
    
    return {
      shouldShowAlert: isForeground,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});
```

#### 1.3.5 Modo Offline

```typescript
// utils/offline-sync.ts
import * as SecureStore from 'expo-secure-store';

interface PendingSync {
  id: string;
  type: 'TASK_UPDATE' | 'REPORT' | 'CHECKIN' | 'CHECKOUT';
  payload: any;
  timestamp: string;
  retryCount: number;
}

class OfflineSyncManager {
  private queue: PendingSync[] = [];
  private isSyncing = false;

  async enqueue(operation: Omit<PendingSync, 'id' | 'timestamp' | 'retryCount'>) {
    const item: PendingSync = {
      ...operation,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      retryCount: 0,
    };

    // Guardar en SecureStore para persistencia
    this.queue.push(item);
    await this.saveQueue();
    
    // Intentar sincronizar si hay conexión
    if (await this.hasConnection()) {
      this.sync();
    }
  }

  async sync() {
    if (this.isSyncing || this.queue.length === 0) return;
    
    this.isSyncing = true;
    const failed: PendingSync[] = [];

    for (const item of this.queue) {
      try {
        await this.executeSync(item);
      } catch (error) {
        item.retryCount++;
        if (item.retryCount < 3) {
          failed.push(item);
        }
      }
    }

    this.queue = failed;
    await this.saveQueue();
    this.isSyncing = false;
  }

  private async executeSync(item: PendingSync) {
    switch (item.type) {
      case 'TASK_UPDATE':
        await api.tasks.update(item.payload);
        break;
      case 'REPORT':
        await api.reports.submit(item.payload);
        break;
      case 'CHECKIN':
        await api.events.checkIn(item.payload);
        break;
      case 'CHECKOUT':
        await api.events.checkOut(item.payload);
        break;
    }
  }

  private async saveQueue() {
    await SecureStore.setItemAsync('offline_sync_queue', JSON.stringify(this.queue));
  }

  private async hasConnection() {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }
}

export const offlineSync = new OfflineSyncManager();
```

---

## 2. Internacionalización (i18n)

### 2.1 Configuración

```typescript
// locales/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import es from './es.json';
import en from './en.json';

export const resources = {
  es: { translation: es },
  en: { translation: en },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale?.startsWith('es') ? 'es' : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;
```

### 2.2 Archivos de Traducción

```json
// locales/es.json
{
  "common": {
    "loading": "Cargando...",
    "error": "Error",
    "success": "Éxito",
    "cancel": "Cancelar",
    "confirm": "Confirmar",
    "save": "Guardar",
    "delete": "Eliminar",
    "edit": "Editar",
    "search": "Buscar",
    "filter": "Filtrar"
  },
  "auth": {
    "login": "Iniciar Sesión",
    "logout": "Cerrar Sesión",
    "register": "Registrarse",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "forgotPassword": "¿Olvidaste tu contraseña?",
    "biometricLogin": "Ingresar con huella/facial"
  },
  "tasks": {
    "title": "Tareas",
    "myTasks": "Mis Tareas",
    "createTask": "Crear Tarea",
    "assignTo": "Asignar a",
    "priority": "Prioridad",
    "dueDate": "Fecha de vencimiento",
    "status": "Estado",
    "report": {
      "title": "Reportar Progreso",
      "submit": "Enviar Reporte",
      "status": "Estado actual",
      "comment": "Comentarios",
      "hours": "Horas trabajadas",
      "photos": "Fotos"
    },
    "priority": {
      "low": "Baja",
      "medium": "Media",
      "high": "Alta",
      "urgent": "Urgente"
    },
    "status": {
      "pending": "Pendiente",
      "inProgress": "En Progreso",
      "blocked": "Bloqueada",
      "completed": "Completada"
    }
  },
  "events": {
    "title": "Eventos",
    "checkin": "Check-in",
    "checkout": "Check-out",
    "attendance": "Asistencia",
    "location": "Ubicación"
  },
  "profile": {
    "title": "Mi Perfil",
    "personalInfo": "Información Personal",
    "skills": "Habilidades",
    "availability": "Disponibilidad",
    "history": "Historial"
  },
  "settings": {
    "title": "Configuración",
    "language": "Idioma",
    "theme": "Tema",
    "notifications": "Notificaciones",
    "privacy": "Privacidad"
  },
  "notifications": {
    "newTask": "Nueva tarea asignada",
    "taskUpdated": "Tarea actualizada",
    "eventReminder": "Recordatorio de evento",
    "eventStarted": "El evento ha comenzado"
  }
}
```

```json
// locales/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "search": "Search",
    "filter": "Filter"
  },
  "auth": {
    "login": "Sign In",
    "logout": "Sign Out",
    "register": "Register",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot your password?",
    "biometricLogin": "Sign in with biometrics"
  },
  "tasks": {
    "title": "Tasks",
    "myTasks": "My Tasks",
    "createTask": "Create Task",
    "assignTo": "Assign to",
    "priority": "Priority",
    "dueDate": "Due date",
    "status": "Status",
    "report": {
      "title": "Report Progress",
      "submit": "Submit Report",
      "status": "Current status",
      "comment": "Comments",
      "hours": "Hours worked",
      "photos": "Photos"
    },
    "priority": {
      "low": "Low",
      "medium": "Medium",
      "high": "High",
      "urgent": "Urgent"
    },
    "status": {
      "pending": "Pending",
      "inProgress": "In Progress",
      "blocked": "Blocked",
      "completed": "Completed"
    }
  },
  "events": {
    "title": "Events",
    "checkin": "Check-in",
    "checkout": "Check-out",
    "attendance": "Attendance",
    "location": "Location"
  },
  "profile": {
    "title": "My Profile",
    "personalInfo": "Personal Information",
    "skills": "Skills",
    "availability": "Availability",
    "history": "History"
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "theme": "Theme",
    "notifications": "Notifications",
    "privacy": "Privacy"
  },
  "notifications": {
    "newTask": "New task assigned",
    "taskUpdated": "Task updated",
    "eventReminder": "Event reminder",
    "eventStarted": "Event has started"
  }
}
```

### 2.3 Selector de Idioma

```typescript
// components/settings/LanguageSelector.tsx
export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useSettings();

  const languages = [
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const handleChangeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <View>
      <Text style={styles.label}>{t('settings.language')}</Text>
      <Picker
        selectedValue={language}
        onValueChange={handleChangeLanguage}
      >
        {languages.map((lang) => (
          <Picker.Item
            key={lang.value}
            label={`${lang.flag} ${lang.label}`}
            value={lang.value}
          />
        ))}
      </Picker>
    </View>
  );
}
```

### 2.4 i18n en Web (Next.js + React)

```typescript
// apps/web/src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import es from './locales/es.json';
import en from './locales/en.json';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: 'en',
    supportedLngs: ['es', 'en'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
  });

export default i18n;
```

```typescript
// apps/landing/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: true,
  },
};

module.exports = nextConfig;
```

---

## 3. API para Móvil

### 3.1 Endpoints Específicos

```yaml
# Tareas
GET    /api/v1/mobile/tasks              # Mis tareas
GET    /api/v1/mobile/tasks/:id          # Detalle de tarea
PATCH  /api/v1/mobile/tasks/:id/status   # Actualizar estado
POST   /api/v1/mobile/tasks/:id/report   # Reportar progreso
POST   /api/v1/mobile/tasks/:id/checkin  # Check-in en tarea

# Eventos
GET    /api/v1/mobile/events             # Próximos eventos
POST   /api/v1/mobile/events/:id/checkin # Check-in
POST   /api/v1/mobile/events/:id/checkout # Check-out
GET    /api/v1/mobile/events/:id/attendees # Lista de asistentes

# Perfil
GET    /api/v1/mobile/profile            # Mi perfil
PATCH  /api/v1/mobile/profile            # Actualizar perfil
GET    /api/v1/mobile/profile/stats      # Estadísticas personales

# Notificaciones
GET    /api/v1/mobile/notifications       # Historial
PATCH  /api/v1/mobile/notifications/:id   # Marcar como leída
POST   /api/v1/mobile/push/token          # Registrar token FCM
```

### 3.2 Mobile API Middleware

```typescript
// apps/api/src/common/middleware/mobile.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MobileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isMobile = req.headers['x-mobile-app'] === 'true';
    
    if (isMobile) {
      // Optimizar respuesta para móvil
      res.setHeader('X-Mobile-Optimized', 'true');
      
      // Reducir payload si es necesario
      const fields = req.query.fields as string;
      if (fields) {
        req['mobileFields'] = fields.split(',');
      }
    }
    
    next();
  }
}
```

---

## 4. Publicación en Tiendas

### 4.1 Configuración Expo EAS

```json
// apps/mobile/eas.json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "buildConfiguration": "Release"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      },
      "ios": {
        "appleId": "tu@apple.id",
        "ascAppId": "123456789"
      }
    }
  }
}
```

### 4.2 Comandos de Build

```bash
# Build de desarrollo (local)
eas build --profile development --platform all

# Build para testing interno
eas build --profile preview --platform android
eas build --profile preview --platform ios

# Build para producción
eas build --profile production --platform android
eas build --profile production --platform ios

# Submit a tiendas
eas submit --platform android
eas submit --platform ios
```

### 4.3 Requisitos para Tiendas

#### Google Play Store

- APK/AAB firmado
- Icono 512x512px
- Feature graphic 1024x500px
- Screenshots (mínimo 2)
- Descripción en español e inglés
- Política de privacidad

#### Apple App Store

- IPA firmado
- Icono 1024x1024px
- Screenshots para diferentes dispositivos
- Descripción en español e inglés
- Política de privacidad
- Cuenta de desarrollador ($99/año)

---

*Documento de arquitectura móvil e i18n para ONG Impacta+ SaaS*
