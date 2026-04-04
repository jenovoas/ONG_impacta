# Solución de Error - Gemini Code Assist IAM

## Error Reportado

```
Permission 'cloudaicompanion.companions.generateChat' denied 
on resource '//cloudaicompanion.googleapis.com/projects/project-0bf4483e-0425-4e55-bdc/locations/global'
Status: PERMISSION_DENIED (403)
```

---

## Causa del Problema

El error ocurre porque:

1. **API de Cloud AI Companion no está habilitada** en tu proyecto de Google Cloud
2. **Faltan permisos IAM** para el usuario/service account que usa Gemini Code Assist
3. El proyecto puede no existir o no tienes acceso a él

---

## Pasos para Solucionar

### 1. Verificar que la API esté habilitada

```bash
# Verificar estado de la API
gcloud services list --filter="cloudaicompanion.googleapis.com"

# Habilitar la API si está deshabilitada
gcloud services enable cloudaicompanion.googleapis.com
```

### 2. Verificar permisos IAM del usuario

```bash
# Verificar permisos actuales
gcloud projects get-iam-policy project-0bf4483e-0425-4e55-bdc

# Listar roles del usuario actual
gcloud projects get-iam-policy project-0bf4483e-0425-4e55-bdc \
  --flatten="bindings[].members" \
  --format="table(bindings.role)" \
  --filter="bindings.members:$(gcloud config get-value account)"
```

### 3. Roles IAM Requeridos

El usuario/service account necesita al menos uno de estos roles:

| Rol | Nivel | Permisos Clave |
|-----|-------|----------------|
| `roles/cloudaicompanion.user` | Mínimo | cloudaicompanion.companions.generateChat |
| `roles/editor` | Recomendado | Todos los permisos de edición |
| `roles/owner` | Completo | Control total del proyecto |

### 4. Asignar Rol al Usuario

```bash
# Asignar rol de usuario de Cloud AI Companion
gcloud projects add-iam-policy-binding project-0bf4483e-0425-4e55-bdc \
  --member="user:$(gcloud config get-value account)" \
  --role="roles/cloudaicompanion.user"

# O asignar rol de editor (más permisos)
gcloud projects add-iam-policy-binding project-0bf4483e-0425-4e55-bdc \
  --member="user:$(gcloud config get-value account)" \
  --role="roles/editor"
```

### 5. Verificar que el Proyecto Exista

```bash
# Verificar información del proyecto
gcloud projects describe project-0bf4483e-0425-4e55-bdc

# Listar todos los proyectos accesibles
gcloud projects list
```

### 6. Si usas Service Account

```bash
# Verificar si es service account
gcloud config get-value auth/impersonate_service_account

# Si usas ADC (Application Default Credentials)
gcloud auth application-default login

# Verificar credenciales actuales
gcloud auth list
```

---

## Diagnóstico Rápido

Ejecuta este script para diagnosticar:

```bash
#!/bin/bash

PROJECT_ID="project-0bf4483e-0425-4e55-bdc"

echo "=== Diagnóstico Gemini Code Assist ==="
echo ""

echo "1. Proyecto actual:"
gcloud config get-value project
echo ""

echo "2. Usuario actual:"
gcloud config get-value account
echo ""

echo "3. ¿Existe el proyecto?"
gcloud projects describe $PROJECT_ID 2>&1 | head -5
echo ""

echo "4. ¿API Cloud AI Companion habilitada?"
gcloud services list --filter="cloudaicompanion.googleapis.com" --format="table(name,state)"
echo ""

echo "5. Credenciales activas:"
gcloud auth list --filter="status:ACTIVE" --format="table(account,status)"
echo ""

echo "=== Fin del Diagnóstico ==="
```

---

## Soluciones Comunes

### Escenario 1: API No Habilitada

```bash
gcloud services enable cloudaicompanion.googleapis.com
```

### Escenario 2: Sin Permisos IAM

```bash
# Pedir al admin del proyecto que asigne el rol
# O si eres owner, asignártelo tú mismo
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:tu@email.com" \
  --role="roles/cloudaicompanion.user"
```

### Escenario 3: Proyecto Incorrecto

```bash
# Verificar proyecto correcto
gcloud config list project

# Cambiar al proyecto correcto
gcloud config set project TU_PROYECTO_CORRECTO
```

### Escenario 4: Credenciales Expiradas

```bash
# Re-autenticar
gcloud auth login

# Para Application Default Credentials
gcloud auth application-default login
```

### Escenario 5: Service Account sin Permisos

```bash
# Asignar permisos al service account
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:tu-sa@project.iam.gserviceaccount.com" \
  --role="roles/cloudaicompanion.user"
```

---

## Verificación en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona el proyecto: `project-0bf4483e-0425-4e55-bdc`
3. Navega a **APIs & Services** > **Library**
4. Busca "Cloud AI Companion API" y verifica que esté **Enabled**
5. Ve a **IAM & Admin** > **IAM**
6. Verifica que tu usuario tenga el rol **Cloud AI Companion User**

---

## Si el Problema Persiste

### Contactar al Administrador del Proyecto

```
Proyecto: project-0bf4483e-0425-4e55-bdc
Rol necesario: roles/cloudaicompanion.user
API necesaria: cloudaicompanion.googleapis.com
```

### Crear Ticket de Soporte

Si estás en una organización:

- Contacta al equipo de DevOps/Infraestructura
- Proporciona el error completo
- Solicita habilitación de API y asignación de rol IAM

---

## Referencias

- [Cloud AI Companion IAM Roles](https://cloud.google.com/iam/docs/understanding-roles)
- [Enabling APIs](https://cloud.google.com/apis/docs/getting-started#enabling_apis)
- [Troubleshooting IAM](https://cloud.google.com/iam/docs/troubleshooting)

---

*Documento generado para solucionar error de Gemini Code Assist*
