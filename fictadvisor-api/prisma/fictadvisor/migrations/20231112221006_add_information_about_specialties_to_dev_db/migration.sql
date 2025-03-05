/*
  Warnings:

  - Added the required column `speciality_id` to the `educational_programs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AbbreviationOfSpeciality" AS ENUM ('SE', 'CE', 'IST');

-- AlterTable
ALTER TABLE "educational_programs" ADD COLUMN     "speciality_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "specialities" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "abbreviation" "AbbreviationOfSpeciality" NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specialities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "educational_programs" ADD CONSTRAINT "educational_programs_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "specialities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
