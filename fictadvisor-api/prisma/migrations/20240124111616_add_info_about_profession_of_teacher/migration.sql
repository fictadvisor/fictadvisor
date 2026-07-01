-- CreateEnum
CREATE TYPE "AcademicStatus" AS ENUM ('DOCENT', 'PROFESSOR', 'SENIOR_RESEARCH_ASSISTANT');

-- CreateEnum
CREATE TYPE "ScientificDegree" AS ENUM ('CANDIDATE', 'DOCTOR');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('ASSOCIATE_PROFESSOR', 'DEPARTMENT_CHAIR', 'PROFESSOR', 'RESEARCH_ASSISTANT', 'SENIOR_RESEARCH_ASSISTANT', 'SENIOR_LECTURER', 'ASSISTANT', 'LEADING_RESEARCHER', 'LECTURER');

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "academic_status" "AcademicStatus",
ADD COLUMN     "position" "Position",
ADD COLUMN     "scientific_degree" "ScientificDegree";
