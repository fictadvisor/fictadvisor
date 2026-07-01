-- CreateTable
CREATE TABLE "representative_data" (
    "entrant_id" TEXT NOT NULL,
    "passport_series" TEXT,
    "passport_number" TEXT NOT NULL,
    "passport_institute" TEXT NOT NULL,
    "passport_date" TEXT NOT NULL,
    "region" TEXT,
    "settlement" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "id_code" TEXT,
    "phone_number" TEXT NOT NULL,
    "email" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "representative_data_entrant_id_key" ON "representative_data"("entrant_id");

-- AddForeignKey
ALTER TABLE "representative_data" ADD CONSTRAINT "representative_data_entrant_id_fkey" FOREIGN KEY ("entrant_id") REFERENCES "entrants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
