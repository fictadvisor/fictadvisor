/*
  Warnings:

  - You are about to drop the column `icon` on the `student_resources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student_resources"
RENAME COLUMN "icon" TO "image_link";

