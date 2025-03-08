-- CreateEnum
CREATE TYPE "State" AS ENUM ('APPROVED', 'PENDING', 'DECLINED');

-- CreateEnum
CREATE TYPE "InstitutionPlan" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "EducationalLevel" AS ENUM ('JUNIOR_BACHELOR', 'BACHELOR', 'MASTER');

-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('TEST', 'ATTACHMENT');

-- CreateEnum
CREATE TYPE "TestQuestionType" AS ENUM ('SINGLE', 'MULTI', 'TEXT');

-- CreateEnum
CREATE TYPE "DisciplineTypeEnum" AS ENUM ('LECTURE', 'PRACTICE', 'LABORATORY', 'CONSULTATION', 'WORKOUT', 'EXAM');

-- CreateEnum
CREATE TYPE "TelegramSource" AS ENUM ('GROUP', 'CHANNEL', 'PERSONAL_CHAT', 'CHAT_WITH_THREADS');

-- CreateEnum
CREATE TYPE "AcademicStatus" AS ENUM ('DOCENT', 'PROFESSOR', 'SENIOR_RESEARCH_ASSISTANT');

-- CreateEnum
CREATE TYPE "ScientificDegree" AS ENUM ('CANDIDATE', 'DOCTOR');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('ASSOCIATE_PROFESSOR', 'DEPARTMENT_CHAIR', 'PROFESSOR', 'RESEARCH_ASSISTANT', 'SENIOR_RESEARCH_ASSISTANT', 'SENIOR_LECTURER', 'ASSISTANT', 'LEADING_RESEARCHER', 'LECTURER');

-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('USER', 'STUDENT', 'MODERATOR', 'CAPTAIN', 'TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Period" AS ENUM ('NO_PERIOD', 'EVERY_WEEK', 'EVERY_FORTNIGHT');

-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "plan" "InstitutionPlan" NOT NULL DEFAULT 'FREE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cathedras" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cathedras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "user_id" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'PENDING',
    "academic_status" "AcademicStatus",
    "scientific_degree" "ScientificDegree",
    "position" "Position" NOT NULL,
    "cathedra_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "specialities" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialities_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "educational_programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "educational_level" "EducationalLevel" NOT NULL,
    "speciality_id" TEXT NOT NULL,
    "cathedra_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educational_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selective_catalogs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "institution_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "selective_catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_selective_catalogs" (
    "id" TEXT NOT NULL,
    "selective_catalog_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_selective_catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "description" TEXT,
    "is_selective" BOOLEAN NOT NULL DEFAULT false,
    "subject_id" TEXT NOT NULL,
    "educational_program_id" TEXT,
    "selective_catalog_id" TEXT,
    "max_student_amount" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selective_disciplines" (
    "id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "selective_disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "assignment_type" "AssignmentType" NOT NULL,
    "max_mark" DECIMAL(65,30) NOT NULL,
    "deadline" TIMESTAMP(3),
    "available_from" TIMESTAMP(3) NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "group_discipline_id" TEXT,
    "lesson_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "assignment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateTable
CREATE TABLE "test_questions" (
    "id" TEXT NOT NULL,
    "type" "TestQuestionType" NOT NULL,
    "question" TEXT NOT NULL,
    "available_answers" TEXT,
    "test_id" TEXT NOT NULL,
    "max_mark" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_question_answers" (
    "id" TEXT NOT NULL,
    "test_question_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "result_mark" DECIMAL(65,30),
    "result_description" TEXT,
    "student_assignment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_question_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_assignments" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "result_mark" DECIMAL(65,30),
    "result_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_resources" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resource_category" TEXT,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "student_assignment_id" TEXT,
    "discipline_id" TEXT,
    "lesson_id" TEXT,
    "assignment_id" TEXT,

    CONSTRAINT "file_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_disciplines" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discipline_types" (
    "id" TEXT NOT NULL,
    "name" "DisciplineTypeEnum" NOT NULL,
    "group_discipline_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discipline_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "admission_year" INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    "educational_program_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "avatar" TEXT,
    "password" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "telegram_id" BIGINT,
    "state" "State" NOT NULL DEFAULT 'PENDING',
    "last_password_changed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institution_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "user_id" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'PENDING',
    "group_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "discipline_teachers" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discipline_teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" "RoleName" NOT NULL,
    "user_id" TEXT NOT NULL,
    "group_id" TEXT,
    "discipline_id" TEXT,
    "educational_program_id" TEXT,
    "cathedra_id" TEXT,
    "department_id" TEXT,
    "institution_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grants" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "set" BOOLEAN NOT NULL DEFAULT true,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_dates" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "institution_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semester_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discipline_teacher_roles" (
    "id" TEXT NOT NULL,
    "discipline_teacher_id" TEXT NOT NULL,
    "discipline_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discipline_teacher_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "period" "Period" NOT NULL,
    "url" TEXT,
    "events_amount" INTEGER NOT NULL DEFAULT 1,
    "is_custom" BOOLEAN NOT NULL DEFAULT false,
    "group_id" TEXT NOT NULL,
    "semester_date_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "event_id" TEXT NOT NULL,
    "discipline_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "reset_password_tokens" (
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reset_password_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "register_password_tokens" (
    "token" TEXT NOT NULL,
    "telegram_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "register_password_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "verify_email_tokens" (
    "token" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "telegram_id" BIGINT,
    "is_captain" BOOLEAN NOT NULL,
    "group_id" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verify_email_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "page_texts" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "link" TEXT,
    "is_shown" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "page_texts_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "institutions_name_key" ON "institutions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_institution_id_abbreviation_key" ON "departments"("institution_id", "abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "cathedras_department_id_abbreviation_key" ON "cathedras"("department_id", "abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_user_id_cathedra_id_key" ON "teachers"("user_id", "cathedra_id");

-- CreateIndex
CREATE UNIQUE INDEX "educational_programs_speciality_id_cathedra_id_name_key" ON "educational_programs"("speciality_id", "cathedra_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "group_selective_catalogs_group_id_selective_catalog_id_key" ON "group_selective_catalogs"("group_id", "selective_catalog_id");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_institution_id_name_key" ON "subjects"("institution_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_subject_id_semester_educational_program_id_sele_key" ON "disciplines"("subject_id", "semester", "educational_program_id", "selective_catalog_id");

-- CreateIndex
CREATE UNIQUE INDEX "selective_disciplines_discipline_id_student_id_key" ON "selective_disciplines"("discipline_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "test_question_answers_student_assignment_id_test_question_i_key" ON "test_question_answers"("student_assignment_id", "test_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_assignments_student_id_assignment_id_key" ON "student_assignments"("student_id", "assignment_id");

-- CreateIndex
CREATE UNIQUE INDEX "group_disciplines_group_id_discipline_id_key" ON "group_disciplines"("group_id", "discipline_id");

-- CreateIndex
CREATE UNIQUE INDEX "discipline_types_name_group_discipline_id_key" ON "discipline_types"("name", "group_discipline_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_code_educational_program_id_key" ON "groups"("code", "educational_program_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_id_key" ON "users"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "discipline_teachers_discipline_id_teacher_id_key" ON "discipline_teachers"("discipline_id", "teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "semester_dates_year_semester_key" ON "semester_dates"("year", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "discipline_teacher_roles_discipline_teacher_id_discipline_t_key" ON "discipline_teacher_roles"("discipline_teacher_id", "discipline_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_discipline_type_id_event_id_key" ON "lessons"("discipline_type_id", "event_id");

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cathedras" ADD CONSTRAINT "cathedras_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_cathedra_id_fkey" FOREIGN KEY ("cathedra_id") REFERENCES "cathedras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_programs" ADD CONSTRAINT "educational_programs_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "specialities"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_programs" ADD CONSTRAINT "educational_programs_cathedra_id_fkey" FOREIGN KEY ("cathedra_id") REFERENCES "cathedras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selective_catalogs" ADD CONSTRAINT "selective_catalogs_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_selective_catalogs" ADD CONSTRAINT "group_selective_catalogs_selective_catalog_id_fkey" FOREIGN KEY ("selective_catalog_id") REFERENCES "selective_catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_selective_catalogs" ADD CONSTRAINT "group_selective_catalogs_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_educational_program_id_fkey" FOREIGN KEY ("educational_program_id") REFERENCES "educational_programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_selective_catalog_id_fkey" FOREIGN KEY ("selective_catalog_id") REFERENCES "selective_catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selective_disciplines" ADD CONSTRAINT "selective_disciplines_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selective_disciplines" ADD CONSTRAINT "selective_disciplines_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_group_discipline_id_fkey" FOREIGN KEY ("group_discipline_id") REFERENCES "group_disciplines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("event_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_questions" ADD CONSTRAINT "test_questions_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("assignment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_question_answers" ADD CONSTRAINT "test_question_answers_test_question_id_fkey" FOREIGN KEY ("test_question_id") REFERENCES "test_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_question_answers" ADD CONSTRAINT "test_question_answers_student_assignment_id_fkey" FOREIGN KEY ("student_assignment_id") REFERENCES "student_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_assignments" ADD CONSTRAINT "student_assignments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_assignments" ADD CONSTRAINT "student_assignments_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_resources" ADD CONSTRAINT "file_resources_student_assignment_id_fkey" FOREIGN KEY ("student_assignment_id") REFERENCES "student_assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_resources" ADD CONSTRAINT "file_resources_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_resources" ADD CONSTRAINT "file_resources_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("event_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_resources" ADD CONSTRAINT "file_resources_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_disciplines" ADD CONSTRAINT "group_disciplines_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_disciplines" ADD CONSTRAINT "group_disciplines_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_types" ADD CONSTRAINT "discipline_types_group_discipline_id_fkey" FOREIGN KEY ("group_discipline_id") REFERENCES "group_disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_educational_program_id_fkey" FOREIGN KEY ("educational_program_id") REFERENCES "educational_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teachers" ADD CONSTRAINT "discipline_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teachers" ADD CONSTRAINT "discipline_teachers_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_educational_program_id_fkey" FOREIGN KEY ("educational_program_id") REFERENCES "educational_programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_cathedra_id_fkey" FOREIGN KEY ("cathedra_id") REFERENCES "cathedras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grants" ADD CONSTRAINT "grants_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_dates" ADD CONSTRAINT "semester_dates_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teacher_roles" ADD CONSTRAINT "discipline_teacher_roles_discipline_teacher_id_fkey" FOREIGN KEY ("discipline_teacher_id") REFERENCES "discipline_teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teacher_roles" ADD CONSTRAINT "discipline_teacher_roles_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_semester_date_id_fkey" FOREIGN KEY ("semester_date_id") REFERENCES "semester_dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
