import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();
async function main () {
  console.log('Start seeding');

  await prisma.semesterDate.createMany({
    data: [
      { year: 2022, semester: 1, startDate: new Date('2022-09-05T00:00:00'), endDate: new Date('2023-01-23T00:00:00') },
      { year: 2022, semester: 2, startDate: new Date('2023-02-05T00:00:00'), endDate: new Date('2023-06-26T00:00:00') },
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
