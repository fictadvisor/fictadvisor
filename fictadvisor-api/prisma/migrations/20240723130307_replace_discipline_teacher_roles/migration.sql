/*
  Warnings:

  - The primary key for the `discipline_teacher_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `discipline_teacher_roles` table. All the data in the column will be lost.
  - The primary key for the `question_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `role` on the `question_roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `created_at` on table `question_roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `question_roles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "discipline_teacher_roles"
    DROP CONSTRAINT "discipline_teacher_roles_pkey",
    DROP COLUMN "role",
    ADD CONSTRAINT "discipline_teacher_roles_pkey" PRIMARY KEY ("discipline_teacher_id", "discipline_type_id");

-- AlterTable
ALTER TABLE "question_roles"
    ALTER COLUMN "created_at" SET NOT NULL,
    ALTER COLUMN "updated_at" SET NOT NULL,
    ALTER COLUMN "role" TYPE text;

UPDATE "question_roles"
SET "role" = CASE
                 WHEN "role" = 'LECTURER' THEN 'LECTURE'
                 WHEN "role" = 'PRACTICIAN' THEN 'PRACTICE'
                 WHEN "role" = 'LABORANT' THEN 'LABORATORY'
                 WHEN "role" = 'EXAMINER' THEN 'EXAM'
                 ELSE 'LECTURE'
    END;

ALTER TABLE "question_roles"
    ALTER COLUMN "role" TYPE "DisciplineTypeEnum" USING "role"::"DisciplineTypeEnum"
