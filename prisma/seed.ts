import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();
async function main () {
  console.log('Start seeding');
  await prisma.subject.create({
    data: {
      id: '87e204ea-4243-4633-b69d-014613bac59e',
      name: 'subject',
    },
  });
  console.log('Finished seeding');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });