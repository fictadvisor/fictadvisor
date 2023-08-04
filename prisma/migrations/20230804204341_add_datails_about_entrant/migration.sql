-- AlterTable
ALTER TABLE "entrants" ADD COLUMN     "payment_type" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "study_form" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "study_type" TEXT NOT NULL DEFAULT '';
