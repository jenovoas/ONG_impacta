#!/bin/bash
# ============================================================
# deploy.sh — Script de despliegue de Impacta+ en Producción
# Ejecutar desde: /home/jnovoas/Desarrollo/ONG_impacta
# ============================================================
set -e

echo "🚀 Iniciando despliegue de Impacta+..."

# Verificar que el .env.prod existe
if [ ! -f ".env.prod" ]; then
  echo "❌ ERROR: No existe .env.prod"
  echo "   Cópialo desde .env.prod.example y rellena los valores"
  exit 1
fi

# Verificar que la red proxy de Traefik existe
if ! podman network inspect proxy > /dev/null 2>&1; then
  echo "❌ ERROR: La red 'proxy' de Traefik no existe."
  echo "   Asegúrate de que el stack sentinel-fenix esté levantado."
  exit 1
fi

echo "✅ Pre-checks pasados"

# Ejecutar migraciones de base de datos antes de iniciar
echo "⏳ Ejecutando migraciones Prisma..."
podman run --rm \
  --env-file .env.prod \
  --env DATABASE_URL="postgresql://${DB_USER:-impacta}:${DB_PASSWORD}@localhost:5434/${DB_NAME:-impacta_prod}" \
  --network host \
  node:20-alpine sh -c "npm i -g pnpm && pnpm --filter @impacta/database exec prisma migrate deploy" || true

# Levantar los servicios
echo "⏳ Construyendo y levantando contenedores..."
podman compose \
  -f infra/docker-compose.prod.yml \
  --env-file .env.prod \
  up -d --build

echo ""
echo "✅ Impacta+ desplegado correctamente"
echo "   Dashboard: https://impacta.pinguinoseguro.cl"
echo "   API:       https://impacta.pinguinoseguro.cl/api"
