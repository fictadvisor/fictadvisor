/*
  Warnings:

  - You are about to drop the column `speciality` on the `queue_users` table. All the data in the column will be lost.
  - Added the required column `specialty` to the `queue_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "queue_users" DROP COLUMN "speciality",
ADD COLUMN     "specialty" TEXT NOT NULL;
