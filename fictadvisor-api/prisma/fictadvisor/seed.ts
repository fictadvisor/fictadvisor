import { PrismaClient } from '@prisma-client/fictadvisor';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.FICTADVISOR_DATABASE_URL }),
});
async function main () {
  console.log('Start seeding');
  await prisma.semesterDate.createMany({
    data: [
      { year: 2022, semester: 1, startDate: new Date('2022-09-05T00:00:00'), endDate: new Date('2023-01-23T00:00:00'), createdAt: new Date(), updatedAt: new Date() },
      { year: 2022, semester: 2, startDate: new Date('2023-02-05T00:00:00'), endDate: new Date('2023-06-26T00:00:00'), createdAt: new Date(), updatedAt: new Date() },
    ],
  });

  console.log('Finished seeding');
}

export default async function () {
  try {
    await main();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
