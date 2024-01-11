-- AlterTable
ALTER TABLE "events" ADD COLUMN     "events_amount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "is_custom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "teacher_force_changes" BOOLEAN NOT NULL DEFAULT false;
