/*
  Warnings:

  - You are about to drop the column `permission_id` on the `grants` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `grants` table. All the data in the column will be lost.
  - The primary key for the `user_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permission` to the `grants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('STUDENT', 'MODERATOR', 'CAPTAIN', 'ADMIN');

-- DropForeignKey
ALTER TABLE "grants" DROP CONSTRAINT "grants_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "grants" DROP CONSTRAINT "grants_role_id_fkey";

-- DropForeignKey
ALTER TABLE "group_roles" DROP CONSTRAINT "group_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "student_roles" DROP CONSTRAINT "student_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "student_roles" DROP CONSTRAINT "student_roles_student_id_fkey";

-- AlterTable
ALTER TABLE "grants" RENAME permission_id TO permission,
ALTER TABLE "grants" DROP COLUMN "scope";

ALTER TABLE user_roles RENAME TO roles;
ALTER TABLE roles RENAME priority TO weight;
ALTER TABLE roles ALTER COLUMN name TYPE RoleName USING name::text::RoleName;

ALTER TABLE student_roles RENAME TO user_roles;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "state" "State" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "permissions";

-- DropEnum
DROP TYPE "UserRoleName";

-- AddForeignKey
ALTER TABLE "group_roles" ADD CONSTRAINT "group_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grants" ADD CONSTRAINT "grants_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
