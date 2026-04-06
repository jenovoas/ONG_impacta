import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: { organization: true }
  });
  console.log('--- USERS IN DATABASE ---');
  users.forEach(u => {
    console.log(`Email: ${u.email}, Org: ${u.organization.slug}, Role: ${u.systemRole}, Hash: ${u.passwordHash.substring(0, 20)}...`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
