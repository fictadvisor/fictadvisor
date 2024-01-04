-- CreateEnum
CREATE TYPE "TelegramSource" AS ENUM ('GROUP', 'CHANNEL', 'PERSONAL_CHAT');

-- CreateTable
CREATE TABLE "telegram_groups" (
    "group_id" TEXT NOT NULL,
    "telegram_id" BIGINT NOT NULL,
    "source" "TelegramSource" NOT NULL,

    CONSTRAINT "telegram_groups_pkey" PRIMARY KEY ("group_id","telegram_id")
);

-- AddForeignKey
ALTER TABLE "telegram_groups" ADD CONSTRAINT "telegram_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
