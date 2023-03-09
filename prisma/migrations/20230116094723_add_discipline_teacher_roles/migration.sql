/*
  Warnings:

  - You are about to drop the column `discipline_type_id` on the `discipline_teachers` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `discipline_teachers` table. All the data in the column will be lost.

*/

-- CreateTable
CREATE TABLE "discipline_teacher_roles" (
    "discipline_teacher_id" TEXT NOT NULL,
    "discipline_type_id" TEXT NOT NULL,
    "role" "TeacherRole" NOT NULL,

    CONSTRAINT "discipline_teacher_roles_pkey" PRIMARY KEY ("discipline_teacher_id","discipline_type_id","role")
);

-- AddForeignKey
ALTER TABLE "discipline_teacher_roles" ADD CONSTRAINT "discipline_teacher_roles_discipline_teacher_id_fkey" FOREIGN KEY ("discipline_teacher_id") REFERENCES "discipline_teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teacher_roles" ADD CONSTRAINT "discipline_teacher_roles_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO
  discipline_teacher_roles (discipline_teacher_id, discipline_type_id, role)
SELECT
  id AS discipline_teacher_id,
  discipline_type_id,
  role
FROM
  discipline_teachers;

-- DropForeignKey
ALTER TABLE "discipline_teachers" DROP CONSTRAINT "discipline_teachers_discipline_type_id_fkey";

-- AlterTable
ALTER TABLE "discipline_teachers" DROP COLUMN "discipline_type_id",
DROP COLUMN "role";
