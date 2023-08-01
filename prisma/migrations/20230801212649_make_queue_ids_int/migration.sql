/*
  Warnings:

  - The primary key for the `queue_positions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `queue_positions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `queues` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `queues` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `queue_id` on the `queue_positions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_queue_id_fkey";

-- AlterTable
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "queue_id",
ADD COLUMN     "queue_id" INTEGER NOT NULL,
ADD CONSTRAINT "queue_positions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "queues" DROP CONSTRAINT "queues_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "queues_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "queues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
