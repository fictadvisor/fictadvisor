/*
  Warnings:

  - You are about to drop the column `entrant_id` on the `queue_positions` table. All the data in the column will be lost.
  - The primary key for the `queue_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `queue_users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `user_id` to the `queue_positions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_entrant_id_fkey";

-- AlterTable
ALTER TABLE "queue_positions" DROP COLUMN "entrant_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "queue_users" DROP CONSTRAINT "queue_users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "queue_users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
