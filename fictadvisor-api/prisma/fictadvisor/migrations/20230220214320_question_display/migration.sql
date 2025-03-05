-- CreateEnum
CREATE TYPE "QuestionDisplay" AS ENUM ('PERCENT', 'AMOUNT', 'TEXT');

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "questionDisplay" "QuestionDisplay" NOT NULL DEFAULT 'PERCENT';
