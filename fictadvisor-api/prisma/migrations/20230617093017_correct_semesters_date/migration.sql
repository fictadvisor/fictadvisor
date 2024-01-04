/*
  Warnings:

  - You are about to drop the `start_dates` table. If the table is not empty, all the data it contains will be lost.

*/

ALTER TABLE "start_dates" RENAME TO "semester_dates";

ALTER TABLE "semester_dates" RENAME CONSTRAINT "start_dates_pkey" TO "semester_dates_pkey";

ALTER TABLE "semester_dates" ADD COLUMN "end_date" TIMESTAMP(3) NOT NULL DEFAULT '2023-01-01 00:00:00 +00:00';
