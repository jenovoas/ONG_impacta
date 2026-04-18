import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const orgId = 'f0321557-666c-4bf3-b29a-79b18f82e0aa'; // demo

  // 1. Members
  const members = [
    { firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com', rut: '12.345.678-9', status: 'ACTIVE' },
    { firstName: 'María', lastName: 'González', email: 'maria@example.com', rut: '9.876.543-2', status: 'ACTIVE' },
    { firstName: 'Pedro', lastName: 'Rodríguez', email: 'pedro@example.com', rut: '15.243.123-K', status: 'INACTIVE' },
  ];

  for (const m of members) {
    await prisma.member.upsert({
      where: { organizationId_rut: { organizationId: orgId, rut: m.rut } },
      update: {},
      create: { ...m, organizationId: orgId },
    });
  }

  // 2. Campaigns
  const campaigns = [
    { name: 'Reforestación 2026', goalAmount: 5000000, currentAmount: 1250000, status: 'ACTIVE' },
    { name: 'Rescate de Fauna', goalAmount: 2000000, currentAmount: 800000, status: 'ACTIVE' },
  ];

  for (const c of campaigns) {
    await prisma.campaign.create({
      data: { ...c, organizationId: orgId },
    });
  }

  // 3. Species
  const species = [
    { commonName: 'Puma Chileno', scientificName: 'Puma concolor', status: 'PROTECTED' },
    { commonName: 'Huemul', scientificName: 'Hippocamelus bisulcus', status: 'ENDANGERED' },
  ];

  for (const s of species) {
    await prisma.species.create({
      data: { ...s, organizationId: orgId },
    });
  }

  // 4. Missions
  const missions = [
    { title: 'Patrullaje Cordillera', status: 'IN_PROGRESS', location: 'Cajón del Maipo' },
    { title: 'Censo de Huemules', status: 'PLANNED', location: 'Torres del Paine' },
  ];

  for (const mis of missions) {
    await prisma.mission.create({
      data: {
        ...mis,
        organizationId: orgId,
        tasks: {
          create: [
            { title: 'Revisión de cámaras trampa', description: 'Chequear baterías y SD cards' },
            { title: 'Registro de avistamientos', description: 'Anotar coordenadas GPS' },
          ],
        },
      },
    });
  }

  console.log('Seed demo data completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
