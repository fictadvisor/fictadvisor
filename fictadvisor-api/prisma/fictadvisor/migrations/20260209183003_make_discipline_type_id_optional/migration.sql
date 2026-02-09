/*
  Warnings:
  - The primary key for the `discipline_teacher_roles` table will be changed.
  - The primary key for the `lessons` table will be changed.
  - We use a 4-step process to safely add the required 'id' column to existing data.
*/

-- ----------------------------
-- 1. Modify "discipline_teacher_roles"
-- ----------------------------

-- Step A: Add 'id' as nullable
ALTER TABLE "discipline_teacher_roles" ADD COLUMN "id" TEXT;

-- Step B: Generate UUIDs for existing rows
UPDATE "discipline_teacher_roles" SET "id" = gen_random_uuid() WHERE "id" IS NULL;

-- Step C: Make 'id' required and set default for future rows
ALTER TABLE "discipline_teacher_roles"
    ALTER COLUMN "id" SET NOT NULL,
    ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- Step D: Update Primary Key and make discipline_type_id nullable
ALTER TABLE "discipline_teacher_roles"
    DROP CONSTRAINT "discipline_teacher_roles_pkey",
    ALTER COLUMN "discipline_type_id" DROP NOT NULL,
    ADD CONSTRAINT "discipline_teacher_roles_pkey" PRIMARY KEY ("id");


-- ----------------------------
-- 2. Modify "lessons"
-- ----------------------------

-- Step A: Add 'id' as nullable
ALTER TABLE "lessons" ADD COLUMN "id" TEXT;

-- Step B: Generate UUIDs for existing rows
UPDATE "lessons" SET "id" = gen_random_uuid() WHERE "id" IS NULL;

-- Step C: Make 'id' required and set default for future rows
ALTER TABLE "lessons"
    ALTER COLUMN "id" SET NOT NULL,
    ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- Step D: Update Primary Key and make discipline_type_id nullable
ALTER TABLE "lessons"
    DROP CONSTRAINT "lessons_pkey",
    ALTER COLUMN "discipline_type_id" DROP NOT NULL,
    ADD CONSTRAINT "lessons_pkey" PRIMARY KEY ("id");


-- ----------------------------
-- 3. Recreate Indices
-- ----------------------------

-- CreateIndex
CREATE UNIQUE INDEX "discipline_teacher_roles_discipline_teacher_id_discipline_t_key"
    ON "discipline_teacher_roles"("discipline_teacher_id", "discipline_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_event_id_discipline_type_id_key"
    ON "lessons"("event_id", "discipline_type_id");
