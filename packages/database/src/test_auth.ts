import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@impacta.cl';
  const pass = 'impacta_dev_pass';

  console.log(`🔍 Intentando validar usuario: ${email}`);
  
  const user = await prisma.user.findFirst({
    where: { email },
    include: { organization: true }
  });

  if (!user) {
    console.error('❌ Usuario NO encontrado en la base de datos.');
    const allUsers = await prisma.user.findMany();
    console.log('Usuarios disponibles:', allUsers.map(u => u.email));
    return;
  }

  console.log(`✅ Usuario encontrado en org: ${user.organization.slug}`);
  console.log(`🔐 Hash en DB: ${user.passwordHash}`);

  const isValid = await argon2.verify(user.passwordHash, pass);
  
  if (isValid) {
    console.log('✨ ¡LA CONTRASEÑA ES VÁLIDA según argon2.verify!');
  } else {
    console.error('❌ LA CONTRASEÑA NO COINCIDE con el hash.');
    
    // Generar un hash fresco para comparar
    const freshHash = await argon2.hash(pass);
    console.log(`💡 Hash recién generado para comparison: ${freshHash}`);
  }
}

main()
  .catch((e) => {
    console.error('💥 Error inesperado:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
