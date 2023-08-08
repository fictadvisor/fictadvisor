-- CreateEnum
CREATE TYPE "StudyForm" AS ENUM ('FULL_TIME', 'PART_TIME');

-- CreateTable
CREATE TABLE "edbo_budget" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "study_form" "StudyForm" NOT NULL,
    "competitive_point" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "edbo_budget_pkey" PRIMARY KEY ("id")
);
