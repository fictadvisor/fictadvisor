import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();
async function main () {
  console.log('Start seeding');

  await prisma.startDate.createMany({
    data: [
      { year: 2022, semester: 1, startDate: new Date('2023-09-10T00:00:00') },
      { year: 2023, semester: 2, startDate: new Date('2023-02-10T00:00:00') },
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
