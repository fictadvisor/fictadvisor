import { PrismaClient } from '@prisma/client/cohorta';
import process from 'process';

const prisma = new PrismaClient();
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
