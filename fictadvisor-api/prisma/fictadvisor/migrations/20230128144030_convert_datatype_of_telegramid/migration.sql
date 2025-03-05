/*
  Warnings:

  - The `telegram_id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/

ALTER TABLE users ADD COLUMN "telegram_temp" INTEGER;

UPDATE users
SET telegram_temp = CAST(users.telegram_id as integer);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "telegram_id",
                    ADD COLUMN     "telegram_id" INTEGER;

UPDATE users
SET telegram_id = users.telegram_temp;

ALTER TABLE users DROP COLUMN "telegram_temp";

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_id_key" ON "users"("telegram_id");
