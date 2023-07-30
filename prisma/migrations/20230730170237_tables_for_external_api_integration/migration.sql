-- CreateEnum
CREATE TYPE "QueuePositionStatus" AS ENUM ('WAITING', 'GOING', 'PROCESSING');

-- CreateEnum
CREATE TYPE "EducationProgram" AS ENUM ('CSSE', 'ISSE', 'IIS', 'ISRS', 'IMST');

-- CreateEnum
CREATE TYPE "PriorityState" AS ENUM ('APPROVED', 'NOT_APPROVED');

-- CreateTable
CREATE TABLE "queue_users" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "telegram_id" BIGINT,
    "email" TEXT,
    "speciality" TEXT NOT NULL,
    "is_dorm" BOOLEAN,
    "printed_edbo" BOOLEAN,

    CONSTRAINT "queue_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queue_positions" (
    "id" TEXT NOT NULL,
    "entrant_id" TEXT NOT NULL,
    "queue_id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "status" "QueuePositionStatus" NOT NULL DEFAULT 'WAITING',
    "last_notified_position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "queue_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queues" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "queues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrants" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "competitive_point" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "entrants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrant_priorities" (
    "entrant_id" TEXT NOT NULL,
    "state" "PriorityState" NOT NULL,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "priorities" (
    "entrant_id" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "program" "EducationProgram" NOT NULL,

    CONSTRAINT "priorities_pkey" PRIMARY KEY ("entrant_id","priority")
);

-- CreateTable
CREATE TABLE "entrant_data" (
    "entrant_id" TEXT NOT NULL,
    "passport_series" TEXT,
    "passport_number" TEXT NOT NULL,
    "passport_institute" TEXT NOT NULL,
    "passport_date" TEXT NOT NULL,
    "region" TEXT,
    "settlement" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "id_code" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contracts" (
    "entrant_id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "group" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "entrant_priorities_entrant_id_key" ON "entrant_priorities"("entrant_id");

-- CreateIndex
CREATE UNIQUE INDEX "entrant_data_entrant_id_key" ON "entrant_data"("entrant_id");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_entrant_id_key" ON "contracts"("entrant_id");

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_entrant_id_fkey" FOREIGN KEY ("entrant_id") REFERENCES "queue_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "queues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrant_priorities" ADD CONSTRAINT "entrant_priorities_entrant_id_fkey" FOREIGN KEY ("entrant_id") REFERENCES "entrants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "priorities" ADD CONSTRAINT "priorities_entrant_id_fkey" FOREIGN KEY ("entrant_id") REFERENCES "entrant_priorities"("entrant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrant_data" ADD CONSTRAINT "entrant_data_entrant_id_fkey" FOREIGN KEY ("entrant_id") REFERENCES "entrants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_entrant_id_fkey" FOREIGN KEY ("entrant_id") REFERENCES "entrants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
