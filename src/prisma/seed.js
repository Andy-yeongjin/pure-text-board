import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: 'test@example.com',
      password: 'password', // 테스트용
      name: '테스트유저'
    }
  });
  console.log('Test user created:', user);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
