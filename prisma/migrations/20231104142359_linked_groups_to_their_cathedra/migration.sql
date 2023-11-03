-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "cathedra_id" TEXT;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_cathedra_id_fkey" FOREIGN KEY ("cathedra_id") REFERENCES "cathedras"("id") ON DELETE CASCADE ON UPDATE CASCADE;
