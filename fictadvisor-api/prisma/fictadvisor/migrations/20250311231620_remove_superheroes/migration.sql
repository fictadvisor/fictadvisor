/*
  Warnings:

  - You are about to drop the `superheroes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "superheroes" DROP CONSTRAINT "superheroes_user_id_fkey";

-- DropTable
DROP TABLE "superheroes";
