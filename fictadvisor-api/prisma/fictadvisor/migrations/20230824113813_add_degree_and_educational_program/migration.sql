-- CreateEnum
CREATE TYPE "EducationalDegree" AS ENUM ('BACHELOR', 'MASTER', 'PHILOSOPHY');

-- CreateEnum
CREATE TYPE "EducationalProgramType" AS ENUM ('PROFESSIONAL', 'SCIENTIFIC');

-- AlterTable
ALTER TABLE "entrants" ADD COLUMN     "degree" "EducationalDegree" NOT NULL DEFAULT 'BACHELOR',
ADD COLUMN     "educational_program" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "program_type" "EducationalProgramType" NOT NULL DEFAULT 'PROFESSIONAL';
