/*
  Warnings:

  - You are about to drop the column `questionDisplay` on the `questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "questionDisplay",
ADD COLUMN     "display" "QuestionDisplay" NOT NULL DEFAULT 'PERCENT';
