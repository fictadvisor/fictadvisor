-- CreateEnum
CREATE TYPE "State" AS ENUM ('APPROVED', 'PENDING', 'DECLINED');

-- CreateEnum
CREATE TYPE "DisciplineTypeEnum" AS ENUM ('LECTURE', 'PRACTICE', 'LABORATORY', 'CONSULTATION', 'WORKOUT', 'EXAM');

-- CreateEnum
CREATE TYPE "FortnightLessonInfoType" AS ENUM ('HOMEWORK', 'URL', 'START_DATE', 'END_DATE', 'COMMENT', 'IS_TEST');

-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('LECTURER', 'LABORANT', 'PRACTICIAN');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'SCALE', 'TOGGLE');

-- CreateEnum
CREATE TYPE "UserRoleName" AS ENUM ('STUDENT', 'MODERATOR', 'CAPTAIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('STUDENT', 'TEACHER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "telegram_id" TEXT,
    "lastPasswordChanged" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_roles" (
    "groupId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "group_roles_pkey" PRIMARY KEY ("groupId","roleId")
);

-- CreateTable
CREATE TABLE "students" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'PENDING'
);

-- CreateTable
CREATE TABLE "superheroes" (
    "user_id" TEXT NOT NULL,
    "dorm" BOOLEAN NOT NULL,
    "state" "State" NOT NULL DEFAULT 'PENDING'
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "is_selective" BOOLEAN NOT NULL DEFAULT false,
    "evaluating_system" TEXT,
    "resource" TEXT,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selective_disciplines" (
    "discipline_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "selective_disciplines_pkey" PRIMARY KEY ("discipline_id","student_id")
);

-- CreateTable
CREATE TABLE "discipline_types" (
    "id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "name" "DisciplineTypeEnum" NOT NULL,

    CONSTRAINT "discipline_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_lessons" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "discipline_type_id" TEXT NOT NULL,

    CONSTRAINT "semester_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fortnight_lessons" (
    "id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "fortnight" INTEGER NOT NULL,

    CONSTRAINT "fortnight_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fortnight_lessons_info" (
    "week_lesson_id" TEXT NOT NULL,
    "type" "FortnightLessonInfoType" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "fortnight_lessons_info_pkey" PRIMARY KEY ("week_lesson_id","type")
);

-- CreateTable
CREATE TABLE "temporary_lessons" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "fortnight" INTEGER NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "discipline_type_id" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "temporary_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "description" TEXT,
    "avatar" TEXT,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discipline_teachers" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "role" "TeacherRole" NOT NULL,
    "discipline_type_id" TEXT NOT NULL,

    CONSTRAINT "discipline_teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "criteria" TEXT,
    "type" "QuestionType" NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_roles" (
    "role" "TeacherRole" NOT NULL,
    "question_id" TEXT NOT NULL,
    "is_shown" BOOLEAN NOT NULL,
    "is_required" BOOLEAN NOT NULL,

    CONSTRAINT "question_roles_pkey" PRIMARY KEY ("question_id","role")
);

-- CreateTable
CREATE TABLE "question_answers" (
    "discipline_teacher_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "question_answers_pkey" PRIMARY KEY ("discipline_teacher_id","question_id","user_id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "name" "UserRoleName" NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_roles" (
    "student_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "student_roles_pkey" PRIMARY KEY ("student_id","role_id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grants" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "set" BOOLEAN NOT NULL DEFAULT true,
    "scope" TEXT NOT NULL,

    CONSTRAINT "grants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "entity_id" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "start_dates" (
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "start_dates_pkey" PRIMARY KEY ("year","semester")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_id_key" ON "users"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "group_roles_roleId_key" ON "group_roles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "superheroes_user_id_key" ON "superheroes"("user_id");

-- AddForeignKey
ALTER TABLE "group_roles" ADD CONSTRAINT "group_roles_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_roles" ADD CONSTRAINT "group_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superheroes" ADD CONSTRAINT "superheroes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selective_disciplines" ADD CONSTRAINT "selective_disciplines_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selective_disciplines" ADD CONSTRAINT "selective_disciplines_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_types" ADD CONSTRAINT "discipline_types_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_lessons" ADD CONSTRAINT "semester_lessons_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fortnight_lessons" ADD CONSTRAINT "fortnight_lessons_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "semester_lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fortnight_lessons_info" ADD CONSTRAINT "fortnight_lessons_info_week_lesson_id_fkey" FOREIGN KEY ("week_lesson_id") REFERENCES "fortnight_lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_lessons" ADD CONSTRAINT "temporary_lessons_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_lessons" ADD CONSTRAINT "temporary_lessons_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teachers" ADD CONSTRAINT "discipline_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_teachers" ADD CONSTRAINT "discipline_teachers_discipline_type_id_fkey" FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_roles" ADD CONSTRAINT "question_roles_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_discipline_teacher_id_fkey" FOREIGN KEY ("discipline_teacher_id") REFERENCES "discipline_teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_roles" ADD CONSTRAINT "student_roles_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_roles" ADD CONSTRAINT "student_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grants" ADD CONSTRAINT "grants_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grants" ADD CONSTRAINT "grants_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
