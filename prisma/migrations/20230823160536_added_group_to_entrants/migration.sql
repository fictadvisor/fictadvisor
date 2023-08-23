/*
  Warnings:

  - You are about to drop the column `group` on the `contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "group";

-- AlterTable
ALTER TABLE "entrants" ADD COLUMN     "group" TEXT;
