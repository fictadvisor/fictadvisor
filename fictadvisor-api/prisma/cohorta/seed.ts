import { PrismaClient } from '@prisma-client/cohorta';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.COHORTA_DATABASE_URL }),
});
async function main () {
  console.log('Start seeding');

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
