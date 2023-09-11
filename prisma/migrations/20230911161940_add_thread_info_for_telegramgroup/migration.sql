-- AlterEnum
ALTER TYPE "TelegramSource" ADD VALUE 'CHAT_WITH_THREADS';

-- AlterTable
ALTER TABLE "telegram_groups" ADD COLUMN     "thread_id" BIGINT;
