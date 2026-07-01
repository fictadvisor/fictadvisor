-- AlterTable
ALTER TABLE "contracts" ALTER COLUMN "group" DROP NOT NULL;

-- AlterTable
ALTER TABLE "entrant_data" ALTER COLUMN "id_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "entrants" ALTER COLUMN "competitive_point" DROP NOT NULL;
