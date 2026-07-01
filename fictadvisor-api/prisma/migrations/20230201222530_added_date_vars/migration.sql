-- CreateTable
CREATE TABLE "date_vars" (
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "date_vars_name_key" ON "date_vars"("name");
