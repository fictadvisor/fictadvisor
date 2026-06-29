-- CreateIndex
CREATE INDEX "complaints_teacher_id_idx" ON "complaints"("teacher_id");

-- CreateIndex
CREATE INDEX "complaints_group_id_idx" ON "complaints"("group_id");

-- CreateIndex
CREATE INDEX "contacts_entity_id_idx" ON "contacts"("entity_id");

-- CreateIndex
CREATE INDEX "discipline_teacher_roles_discipline_type_id_idx" ON "discipline_teacher_roles"("discipline_type_id");

-- CreateIndex
CREATE INDEX "discipline_teachers_teacher_id_idx" ON "discipline_teachers"("teacher_id");

-- CreateIndex
CREATE INDEX "discipline_teachers_discipline_id_idx" ON "discipline_teachers"("discipline_id");

-- CreateIndex
CREATE INDEX "discipline_types_discipline_id_idx" ON "discipline_types"("discipline_id");

-- CreateIndex
CREATE INDEX "disciplines_group_id_year_semester_idx" ON "disciplines"("group_id", "year", "semester");

-- CreateIndex
CREATE INDEX "disciplines_subject_id_idx" ON "disciplines"("subject_id");

-- CreateIndex
CREATE INDEX "educational_programs_speciality_id_idx" ON "educational_programs"("speciality_id");

-- CreateIndex
CREATE INDEX "grants_role_id_idx" ON "grants"("role_id");

-- CreateIndex
CREATE INDEX "groups_cathedra_id_idx" ON "groups"("cathedra_id");

-- CreateIndex
CREATE INDEX "groups_educational_program_id_idx" ON "groups"("educational_program_id");

-- CreateIndex
CREATE INDEX "lessons_discipline_type_id_idx" ON "lessons"("discipline_type_id");

-- CreateIndex
CREATE INDEX "question_answers_question_id_idx" ON "question_answers"("question_id");

-- CreateIndex
CREATE INDEX "question_answers_user_id_idx" ON "question_answers"("user_id");

-- CreateIndex
CREATE INDEX "removed_discipline_teachers_student_id_idx" ON "removed_discipline_teachers"("student_id");

-- CreateIndex
CREATE INDEX "roles_parentId_idx" ON "roles"("parentId");

-- CreateIndex
CREATE INDEX "selective_disciplines_student_id_idx" ON "selective_disciplines"("student_id");

-- CreateIndex
CREATE INDEX "students_group_id_idx" ON "students"("group_id");

-- CreateIndex
CREATE INDEX "teachers_on_cathedras_cathedra_id_idx" ON "teachers_on_cathedras"("cathedra_id");

-- CreateIndex
CREATE INDEX "user_roles_role_id_idx" ON "user_roles"("role_id");
