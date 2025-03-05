-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_group_id_fkey";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "admission_year" INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE);

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "admission_year" INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
ALTER COLUMN "group_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
