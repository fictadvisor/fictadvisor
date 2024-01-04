/*
  Warnings:

  - You are about to drop the column `evaluating_system` on the `disciplines` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `disciplines` table. All the data in the column will be lost.
  - You are about to drop the `fortnight_lessons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fortnight_lessons_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `semester_lessons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `temporary_lessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Period" AS ENUM ('NO_PERIOD', 'EVERY_WEEK', 'EVERY_FORTNIGHT');

-- DropForeignKey
ALTER TABLE "fortnight_lessons" DROP CONSTRAINT "fortnight_lessons_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "fortnight_lessons_info" DROP CONSTRAINT "fortnight_lessons_info_week_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "semester_lessons" DROP CONSTRAINT "semester_lessons_discipline_type_id_fkey";

-- DropForeignKey
ALTER TABLE "temporary_lessons" DROP CONSTRAINT "temporary_lessons_discipline_type_id_fkey";

-- DropForeignKey
ALTER TABLE "temporary_lessons" DROP CONSTRAINT "temporary_lessons_teacher_id_fkey";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "evaluating_system",
DROP COLUMN "resource",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "fortnight_lessons";

-- DropTable
DROP TABLE "fortnight_lessons_info";

-- DropTable
DROP TABLE "semester_lessons";

-- DropTable
DROP TABLE "temporary_lessons";

-- DropEnum
DROP TYPE "FortnightLessonInfoType";

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "period" "Period" NOT NULL,
    "url" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_info" (
    "event_id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "event_info_pkey" PRIMARY KEY ("event_id","number")
);

-- CreateTable
CREATE TABLE "lessons" (
    "event_id" TEXT NOT NULL,
    "discipline_type_id" TEXT NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("event_id","discipline_type_id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_info" ADD CONSTRAINT "event_info_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
