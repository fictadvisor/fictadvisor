/*
  Warnings:

  - Changed the type of `user_id` on the `queue_positions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_user_id_fkey";

-- AlterTable
ALTER TABLE "queue_positions" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "queue_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
