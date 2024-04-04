-- CreateTable
CREATE TABLE "faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faq_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_to_category" (
    "faq_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faq_to_category_pkey" PRIMARY KEY ("faq_id","category_id")
);

-- AddForeignKey
ALTER TABLE "faq_to_category" ADD CONSTRAINT "faq_to_category_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "faq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faq_to_category" ADD CONSTRAINT "faq_to_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "faq_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
