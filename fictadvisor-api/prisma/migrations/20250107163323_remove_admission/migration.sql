/*
  Warnings:

  - You are about to drop the `contracts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `edbo_budget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `entrant_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `entrant_priorities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `entrants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `priorities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `queue_positions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `queue_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `queues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `representative_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specialties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_entrant_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_data" DROP CONSTRAINT "customer_data_entrant_id_fkey";

-- DropForeignKey
ALTER TABLE "entrant_data" DROP CONSTRAINT "entrant_data_entrant_id_fkey";

-- DropForeignKey
ALTER TABLE "entrant_priorities" DROP CONSTRAINT "entrant_priorities_entrant_id_fkey";

-- DropForeignKey
ALTER TABLE "priorities" DROP CONSTRAINT "priorities_entrant_id_fkey";

-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_queue_id_fkey";

-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "representative_data" DROP CONSTRAINT "representative_data_entrant_id_fkey";

-- DropForeignKey
ALTER TABLE "specialties" DROP CONSTRAINT "specialties_entrant_id_fkey";

-- DropTable
DROP TABLE "contracts";

-- DropTable
DROP TABLE "customer_data";

-- DropTable
DROP TABLE "edbo_budget";

-- DropTable
DROP TABLE "entrant_data";

-- DropTable
DROP TABLE "entrant_priorities";

-- DropTable
DROP TABLE "entrants";

-- DropTable
DROP TABLE "priorities";

-- DropTable
DROP TABLE "queue_positions";

-- DropTable
DROP TABLE "queue_users";

-- DropTable
DROP TABLE "queues";

-- DropTable
DROP TABLE "representative_data";

-- DropTable
DROP TABLE "specialties";

-- DropEnum
DROP TYPE "EducationalDegree";

-- DropEnum
DROP TYPE "EducationalProgramType";

-- DropEnum
DROP TYPE "PriorityState";

-- DropEnum
DROP TYPE "QueuePositionStatus";

-- DropEnum
DROP TYPE "StudyForm";
