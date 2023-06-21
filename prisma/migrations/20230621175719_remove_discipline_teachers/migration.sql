-- CreateTable
CREATE TABLE "removed_discipline_teachers" (
    "student_id" TEXT NOT NULL,
    "discipline_teacher_id" TEXT NOT NULL,

    CONSTRAINT "removed_discipline_teachers_pkey" PRIMARY KEY ("discipline_teacher_id","student_id")
);

-- AddForeignKey
ALTER TABLE "removed_discipline_teachers" ADD CONSTRAINT "removed_discipline_teachers_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "removed_discipline_teachers" ADD CONSTRAINT "removed_discipline_teachers_discipline_teacher_id_fkey" FOREIGN KEY ("discipline_teacher_id") REFERENCES "discipline_teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
