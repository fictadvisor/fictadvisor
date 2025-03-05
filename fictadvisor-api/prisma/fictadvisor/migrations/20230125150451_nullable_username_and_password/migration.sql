-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "roles" RENAME CONSTRAINT "user_roles_pkey" TO "roles_pkey";

-- AlterTable
ALTER TABLE "user_roles" RENAME CONSTRAINT "student_roles_pkey" TO "user_roles_pkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL;
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;
