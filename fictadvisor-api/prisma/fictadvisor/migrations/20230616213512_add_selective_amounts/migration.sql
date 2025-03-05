-- CreateTable
CREATE TABLE "selective_amounts" (
    "group_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "selective_amounts_pkey" PRIMARY KEY ("group_id","year","semester")
);

-- AddForeignKey
ALTER TABLE "selective_amounts" ADD CONSTRAINT "selective_amounts_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
