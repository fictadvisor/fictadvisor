/*
  Warnings:

  - Added the required column `category` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "category" TEXT NOT NULL;
ALTER TABLE "questions" ADD COLUMN     "description" TEXT;
