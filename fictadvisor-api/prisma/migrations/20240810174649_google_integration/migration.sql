/*
  Warnings:

  - A unique constraint covering the columns `[google_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "google_id" TEXT;

-- AlterTable
ALTER TABLE "verify_email_tokens" ADD COLUMN     "google_id" TEXT;

-- CreateTable
CREATE TABLE "google_users" (
    "google_id" TEXT NOT NULL,
    "calendar_id" TEXT,
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "google_state_tokens" (
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "google_state_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "google_users_google_id_key" ON "google_users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "google_state_tokens_user_id_key" ON "google_state_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- AddForeignKey
ALTER TABLE "google_users" ADD CONSTRAINT "google_users_google_id_fkey" FOREIGN KEY ("google_id") REFERENCES "users"("google_id") ON DELETE CASCADE ON UPDATE CASCADE;
