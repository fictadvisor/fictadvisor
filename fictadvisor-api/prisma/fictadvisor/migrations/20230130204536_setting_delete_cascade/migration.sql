-- DropForeignKey
ALTER TABLE "discipline_teacher_roles" DROP CONSTRAINT "discipline_teacher_roles_discipline_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "discipline_teacher_roles" DROP CONSTRAINT "discipline_teacher_roles_discipline_type_id_fkey";

-- DropForeignKey
ALTER TABLE "discipline_teachers" DROP CONSTRAINT "discipline_teachers_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "discipline_teachers" DROP CONSTRAINT "discipline_teachers_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "discipline_types" DROP CONSTRAINT "discipline_types_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "disciplines" DROP CONSTRAINT "disciplines_group_id_fkey";

-- DropForeignKey
ALTER TABLE "disciplines" DROP CONSTRAINT "disciplines_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "fortnight_lessons" DROP CONSTRAINT "fortnight_lessons_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "fortnight_lessons_info" DROP CONSTRAINT "fortnight_lessons_info_week_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "grants" DROP CONSTRAINT "grants_role_id_fkey";

-- DropForeignKey
ALTER TABLE "group_roles" DROP CONSTRAINT "group_roles_groupId_fkey";

-- DropForeignKey
ALTER TABLE "group_roles" DROP CONSTRAINT "group_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "question_answers" DROP CONSTRAINT "question_answers_discipline_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "question_answers" DROP CONSTRAINT "question_answers_question_id_fkey";

-- DropForeignKey
ALTER TABLE "question_answers" DROP CONSTRAINT "question_answers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "question_roles" DROP CONSTRAINT "question_roles_question_id_fkey";

-- DropForeignKey
ALTER TABLE "selective_disciplines" DROP CONSTRAINT "selective_disciplines_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "selective_disciplines" DROP CONSTRAINT "selective_disciplines_student_id_fkey";

-- DropForeignKey
ALTER TABLE "semester_lessons" DROP CONSTRAINT "semester_lessons_discipline_type_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_group_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_user_id_fkey";

-- DropForeignKey
ALTER TABLE "superheroes" DROP CONSTRAINT "superheroes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "temporary_lessons" DROP CONSTRAINT "temporary_lessons_discipline_type_id_fkey";

-- DropForeignKey
ALTER TABLE "temporary_lessons" DROP CONSTRAINT "temporary_lessons_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_student_id_fkey";

-- AddForeignKey
ALTER TABLE "group_roles" ADD CONSTRAINT "group_roles_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_roles" ADD CONSTRAINT "group_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superheroes" ADD CONSTRAINT "superheroes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selective_disciplines" ADD CONSTRAINT "selective_disciplines_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selective_disciplines" ADD CONSTRAINT "selective_disciplines_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_types" ADD CONSTRAINT "discipline_types_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_lessons" ADD CONSTRAINT "semester_lessons_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fortnight_lessons" ADD CONSTRAINT "fortnight_lessons_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "semester_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fortnight_lessons_info" ADD CONSTRAINT "fortnight_lessons_info_week_lesson_id_fkey" FOREIGN KEY ("week_lesson_id") REFERENCES "fortnight_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_lessons" ADD CONSTRAINT "temporary_lessons_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_lessons" ADD CONSTRAINT "temporary_lessons_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teachers" ADD CONSTRAINT "discipline_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teachers" ADD CONSTRAINT "discipline_teachers_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_roles" ADD CONSTRAINT "question_roles_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_discipline_teacher_id_fkey" FOREIGN KEY ("discipline_teacher_id") REFERENCES "discipline_teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grants" ADD CONSTRAINT "grants_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teacher_roles" ADD CONSTRAINT "discipline_teacher_roles_discipline_teacher_id_fkey" FOREIGN KEY ("discipline_teacher_id") REFERENCES "discipline_teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teacher_roles" ADD CONSTRAINT "discipline_teacher_roles_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
