/*
  Warnings:

  - You are about to drop the column `value` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "value",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;
