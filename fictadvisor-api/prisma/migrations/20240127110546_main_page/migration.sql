-- CreateTable
CREATE TABLE "page_texts" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "link" TEXT,
    "is_shown" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "page_texts_key_key" ON "page_texts"("key");
