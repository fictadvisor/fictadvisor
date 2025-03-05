-- CreateTable
CREATE TABLE "specialties" (
    "entrant_id" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "studyForm" TEXT NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("entrant_id","specialty")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialties_entrant_id_key" ON "specialties"("entrant_id");

-- AddForeignKey
ALTER TABLE "specialties" ADD CONSTRAINT "specialties_entrant_id_fkey" FOREIGN KEY ("entrant_id") REFERENCES "entrants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
