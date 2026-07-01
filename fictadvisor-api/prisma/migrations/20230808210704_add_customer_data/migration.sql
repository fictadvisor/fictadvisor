-- CreateTable
CREATE TABLE "customer_data" (
    "entrant_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "customer_data_entrant_id_key" ON "customer_data"("entrant_id");

-- AddForeignKey
ALTER TABLE "customer_data" ADD CONSTRAINT "customer_data_entrant_id_fkey" FOREIGN KEY ("entrant_id") REFERENCES "entrants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
