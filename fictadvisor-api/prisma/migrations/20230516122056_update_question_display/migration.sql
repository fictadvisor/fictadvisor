/*
  Warnings:

  - The values [PERCENT] on the enum `QuestionDisplay` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "QuestionDisplay" RENAME VALUE 'PERCENT' TO 'RADAR';
ALTER TYPE "QuestionDisplay" ADD VALUE 'CIRCLE';

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "display" SET DEFAULT 'RADAR';
