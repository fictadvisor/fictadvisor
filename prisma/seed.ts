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

  await prisma.startDate.createMany({
    data: [
      { year: 2022, semester: 1, startDate: new Date('2023-09-10T00:00:00')},
      { year: 2023, semester: 2, startDate: new Date('2023-02-10T00:00:00')},
    ],
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
