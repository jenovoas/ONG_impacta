import { PrismaClient, Plan, SystemRole, AccountType } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // 1. Crear Organización Maestra (SaaS Owner) e Institución Inicial
  const primaryOrg = await prisma.organization.upsert({
    where: { slug: 'impacta' },
    update: {},
    create: {
      name: 'ONG Impacta+',
      slug: 'impacta',
      email: 'admin@impacta.cl',
      plan: Plan.ENTERPRISE,
      isActive: true,
      isVerified: true,
      settings: {
        theme: 'dark',
        primaryColor: '#00A8FF',
        accentColor: '#00D4AA'
      }
    }
  });

  console.log(`✅ Organización creada: ${primaryOrg.name}`);

  // 2. Crear Super Administrador
  const passwordHash = await argon2.hash('impacta_dev_pass');
  const superAdmin = await prisma.user.upsert({
    where: {
      organizationId_email: {
        organizationId: primaryOrg.id,
        email: 'admin@impacta.cl'
      }
    },
    update: {},
    create: {
      organizationId: primaryOrg.id,
      email: 'admin@impacta.cl',
      passwordHash,
      name: 'Super Admin Impacta',
      systemRole: SystemRole.SUPER_ADMIN,
      isActive: true,
      emailVerified: true
    }
  });

  console.log(`✅ Super Admin creado: ${superAdmin.email}`);

  // 3. Crear Plan de Cuentas Chileno Básico (Resumen)
  const baseAccounts = [
    { code: '1', name: 'ACTIVO', type: AccountType.ASSET, level: 1, allowsEntries: false },
    { code: '1.1', name: 'ACTIVO CIRCULANTE', type: AccountType.ASSET, level: 2, allowsEntries: false },
    { code: '1.1.01', name: 'CAJA Y BANCO', type: AccountType.ASSET, level: 3, allowsEntries: true },
    { code: '2', name: 'PASIVO', type: AccountType.LIABILITY, level: 1, allowsEntries: false },
    { code: '3', name: 'PATRIMONIO', type: AccountType.EQUITY, level: 1, allowsEntries: false },
    { code: '4', name: 'INGRESOS', type: AccountType.REVENUE, level: 1, allowsEntries: false },
    { code: '4.1', name: 'INGRESOS POR DONACIONES', type: AccountType.REVENUE, level: 2, allowsEntries: true },
    { code: '5', name: 'GASTOS', type: AccountType.EXPENSE, level: 1, allowsEntries: false },
  ];

  for (const acc of baseAccounts) {
    await prisma.account.upsert({
      where: {
        organizationId_code: {
          organizationId: primaryOrg.id,
          code: acc.code
        }
      },
      update: {},
      create: {
        organizationId: primaryOrg.id,
        ...acc
      }
    });
  }

  console.log('✅ Plan de cuentas base inicializado.');
  console.log('✨ Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
