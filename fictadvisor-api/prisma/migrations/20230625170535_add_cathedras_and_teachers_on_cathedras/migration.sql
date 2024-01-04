-- CreateTable
CREATE TABLE "cathedras" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "cathedras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers_on_cathedras" (
    "teacher_id" TEXT NOT NULL,
    "cathedra_id" TEXT NOT NULL,

    CONSTRAINT "teachers_on_cathedras_pkey" PRIMARY KEY ("teacher_id","cathedra_id")
);

-- AddForeignKey
ALTER TABLE "teachers_on_cathedras" ADD CONSTRAINT "teachers_on_cathedras_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_on_cathedras" ADD CONSTRAINT "teachers_on_cathedras_cathedra_id_fkey" FOREIGN KEY ("cathedra_id") REFERENCES "cathedras"("id") ON DELETE CASCADE ON UPDATE CASCADE;
