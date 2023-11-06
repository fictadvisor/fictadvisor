-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "educational_program_id" TEXT;

-- CreateTable
CREATE TABLE "educational_programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" "EducationProgram" NOT NULL,

    CONSTRAINT "educational_programs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_educational_program_id_fkey" FOREIGN KEY ("educational_program_id") REFERENCES "educational_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
