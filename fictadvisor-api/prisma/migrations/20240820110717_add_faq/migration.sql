-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "faq_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs_to_categories" (
    "faq_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "faqs_to_categories_pkey" PRIMARY KEY ("faq_id","category_id")
);

-- AddForeignKey
ALTER TABLE "faqs_to_categories" ADD CONSTRAINT "faqs_to_categories_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "faqs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs_to_categories" ADD CONSTRAINT "faqs_to_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "faq_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
