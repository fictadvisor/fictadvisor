/*
  Warnings:

  - Added the required column `discipline_id` to the `discipline_teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discipline_teachers" ADD COLUMN     "discipline_id" TEXT NULL;

UPDATE
  discipline_teachers
SET
  discipline_id = (SELECT
  d.id
FROM
  disciplines d,
  discipline_types dt,
  discipline_teacher_roles dtr
WHERE
  discipline_teachers.id = dtr.discipline_teacher_id
  AND
  dtr.discipline_type_id = dt.id
  AND
  dt.discipline_id = d.id);

ALTER TABLE
  "discipline_teachers"
ALTER COLUMN
  "discipline_id"
    SET NOT NULL;

-- AddForeignKey
ALTER TABLE "discipline_teachers" ADD CONSTRAINT "discipline_teachers_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
