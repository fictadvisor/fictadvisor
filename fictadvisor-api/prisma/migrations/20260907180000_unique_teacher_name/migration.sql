-- A teacher is identified by their name: the parser resolves one by matching the
-- three name parts and creates a row when it finds nothing, and nothing forbade a
-- second row wearing the same name. A duplicate silently splits one lecturer in
-- two -- half the disciplines hang off each, ratings are computed over half the
-- poll answers, and the teacher page shows whichever row the query reached first.
--
-- `middle_name` becomes NOT NULL first, and that is not cosmetic: Postgres treats
-- NULLs as distinct in a unique index, so two rows with a null patronymic would
-- slip past the constraint below. It already defaults to '' and neither database
-- holds a single NULL, so the column change costs nothing today and closes the
-- gap for tomorrow. Both DTOs that write it (create-teacher, update-teacher)
-- declare `middleName?: string`, so no caller sends null.
--
-- Prod held 630 teachers with zero duplicates when this was written. Dev held 634
-- with two duplicated names -- Гордієнко Нікіта Юрійович (52 and 58 discipline
-- rows, all 52 of the smaller one against disciplines the larger already covers)
-- and Шиць Олександра Русланівна (75 rows and an empty twin). Neither carries a
-- single poll answer, so the merge below loses nothing there; it is written
-- generally rather than against those ids so it also covers whatever a restored
-- dump happens to contain.
--
-- The survivor is the row with the most disciplines, then the most cathedras,
-- then the oldest. Children move to it and are dropped only where it already
-- covers that discipline or cathedra; among equals the row carrying poll answers
-- wins, so answers are never the half that gets discarded.

UPDATE "teachers" SET "middle_name" = '' WHERE "middle_name" IS NULL;

-- Losing rows mapped to the row that survives them.
CREATE TEMP TABLE teacher_merge AS
WITH ranked AS (
  SELECT t."id", t."last_name", t."first_name", t."middle_name", t."created_at",
         (SELECT count(*) FROM "discipline_teachers" dt WHERE dt."teacher_id" = t."id") AS dts,
         (SELECT count(*) FROM "teachers_on_cathedras" tc WHERE tc."teacher_id" = t."id") AS caths
  FROM "teachers" t
  WHERE (t."last_name", t."first_name", t."middle_name") IN (
    SELECT "last_name", "first_name", "middle_name" FROM "teachers"
    GROUP BY 1, 2, 3 HAVING count(*) > 1
  )
), pick AS (
  SELECT r.*, first_value(r."id") OVER (
           PARTITION BY r."last_name", r."first_name", r."middle_name"
           ORDER BY r.dts DESC, r.caths DESC, r."created_at", r."id"
         ) AS keep_id
  FROM ranked r
)
SELECT "id" AS loser_id, keep_id FROM pick WHERE "id" <> keep_id;

-- discipline_teachers is unique on (discipline_id, teacher_id) since
-- 20260907120000, so a losing row cannot move onto a discipline the survivor
-- already teaches. Ranking spans the losers as well, not just the survivor,
-- because a name can be duplicated more than once.
DELETE FROM "discipline_teachers"
WHERE "id" IN (
  SELECT "id" FROM (
    SELECT dt."id",
           row_number() OVER (
             PARTITION BY coalesce(m.keep_id, dt."teacher_id"), dt."discipline_id"
             ORDER BY (m.keep_id IS NULL) DESC,
                      (SELECT count(*) FROM "question_answers" qa
                         WHERE qa."discipline_teacher_id" = dt."id") DESC,
                      dt."created_at", dt."id"
           ) AS rn
    FROM "discipline_teachers" dt
    LEFT JOIN teacher_merge m ON m.loser_id = dt."teacher_id"
    WHERE coalesce(m.keep_id, dt."teacher_id") IN (SELECT keep_id FROM teacher_merge)
  ) x WHERE x.rn > 1
);

DELETE FROM "teachers_on_cathedras"
WHERE ("teacher_id", "cathedra_id") IN (
  SELECT "teacher_id", "cathedra_id" FROM (
    SELECT tc."teacher_id", tc."cathedra_id",
           row_number() OVER (
             PARTITION BY coalesce(m.keep_id, tc."teacher_id"), tc."cathedra_id"
             ORDER BY (m.keep_id IS NULL) DESC, tc."created_at", tc."teacher_id"
           ) AS rn
    FROM "teachers_on_cathedras" tc
    LEFT JOIN teacher_merge m ON m.loser_id = tc."teacher_id"
    WHERE coalesce(m.keep_id, tc."teacher_id") IN (SELECT keep_id FROM teacher_merge)
  ) x WHERE x.rn > 1
);

UPDATE "discipline_teachers" dt SET "teacher_id" = m.keep_id
  FROM teacher_merge m WHERE dt."teacher_id" = m.loser_id;

UPDATE "teachers_on_cathedras" tc SET "teacher_id" = m.keep_id
  FROM teacher_merge m WHERE tc."teacher_id" = m.loser_id;

UPDATE "complaints" c SET "teacher_id" = m.keep_id
  FROM teacher_merge m WHERE c."teacher_id" = m.loser_id;

DELETE FROM "teachers" t USING teacher_merge m WHERE t."id" = m.loser_id;

DROP TABLE teacher_merge;

ALTER TABLE "teachers" ALTER COLUMN "middle_name" SET NOT NULL;

CREATE UNIQUE INDEX "teachers_last_name_first_name_middle_name_key" ON "teachers"("last_name", "first_name", "middle_name");
