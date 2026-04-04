-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Habilitar RLS en todas las tablas tenant (se crearán vía Prisma, pero pre-configuramos RLS)
-- Nota: Prisma creará las tablas, pero este script se ejecuta al inicio del contenedor.
-- Usaremos un bloque DO para manejar las tablas una vez existan o simplemente configurar el mecanismo.

-- El tenant_id se pasa via SET app.current_org_id = 'xxx'
-- NestJS lo inyecta en cada request via middleware

-- Función para obtener el org_id actual
CREATE OR REPLACE FUNCTION get_current_org_id() RETURNS TEXT AS $$
  SELECT current_setting('app.current_org_id', true);
$$ LANGUAGE sql STABLE;

-- Nota: Como Prisma crea las tablas después, las políticas RLS se aplicarán 
-- habitualmente mediante una migración de Prisma o un script de post-migración.
-- Sin embargo, dejamos aquí la estructura base.

-- Seed inicial de organizaciones (ejemplo para desarrollo)
-- INSERT INTO organizations (id, name, slug, email) VALUES ('cuid_org_1', 'ONG Impacta Test', 'ong-test', 'test@impacta.cl');
