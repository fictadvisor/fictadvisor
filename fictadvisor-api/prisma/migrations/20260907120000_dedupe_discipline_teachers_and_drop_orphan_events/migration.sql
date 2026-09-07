-- Two unrelated messes, both surfaced by auditing what the nightly parse leaves behind.
--
-- 1. Events with no lesson row.
--    `saveWeekSchedule` matches a stored pair against a parsed one on
--    (name, startTime, endTime, disciplineType.name, period), and the discipline type
--    lives on the *lesson*. An event that never got its lesson therefore cannot match
--    anything, ever: every later parse walks past it, creates a second correct event
--    beside it, and the orphan survives untouched. Prod held 102, all created inside
--    four minutes on 2026-09-01 by a manual re-parse that stopped before attaching
--    lessons.
--    The predicate is deliberately narrow. `is_custom` events are user-created and
--    legitimately carry no lesson (1657 of them on prod), and past semesters hold
--    another 4528 lessonless rows whose origin is not established -- both are left
--    alone. Only the current semester's parser-made orphans go.
--
-- 2. Duplicate (discipline, teacher) pairs.
--    Both writers of discipline_teachers are a `findOne ?? create` pair and nothing
--    forbade a second row, so one teacher could hang off one discipline twice. Prod
--    held 31 extra rows across 23 pairs, created between 2024-02-12 and 2025-09-02 --
--    none since, and none in a current-semester discipline, so whatever produced them
--    is already gone. The unique index at the bottom is what keeps it that way.
--
--    They are *merged*, not deleted: 85 poll answers hang off the losing rows and a
--    plain DELETE would cascade them into nothing. Children move to the survivor and
--    are dropped only where that survivor already holds the same answer (same question,
--    same user), the same role type, or the same student's removal -- 21 answers,
--    14 roles and 5 removals on prod, each of them the duplicate half of a pair.
--    The survivor is the row carrying the most answers, then the most roles, then the
--    oldest; ties break on id so the choice is deterministic.

DELETE FROM "events" e
WHERE e."is_custom" = false
  AND e."start_time" >= DATE '2026-08-31'
  AND NOT EXISTS (SELECT 1 FROM "lessons" l WHERE l."event_id" = e."id");

-- Losing rows mapped to the row that survives them.
CREATE TEMP TABLE dt_merge AS
WITH ranked AS (
  SELECT dt."id", dt."discipline_id", dt."teacher_id", dt."created_at",
         (SELECT count(*) FROM "question_answers" qa
            WHERE qa."discipline_teacher_id" = dt."id") AS answers,
         (SELECT count(*) FROM "discipline_teacher_roles" r
            WHERE r."discipline_teacher_id" = dt."id") AS roles,
         (SELECT count(*) FROM "removed_discipline_teachers" rt
            WHERE rt."discipline_teacher_id" = dt."id") AS removed
  FROM "discipline_teachers" dt
  WHERE (dt."discipline_id", dt."teacher_id") IN (
    SELECT "discipline_id", "teacher_id" FROM "discipline_teachers"
    GROUP BY 1, 2 HAVING count(*) > 1
  )
), pick AS (
  SELECT r.*, first_value(r."id") OVER (
           PARTITION BY r."discipline_id", r."teacher_id"
           ORDER BY r.answers DESC, r.roles DESC, r.removed DESC, r."created_at", r."id"
         ) AS keep_id
  FROM ranked r
)
SELECT "id" AS loser_id, keep_id FROM pick WHERE "id" <> keep_id;

-- Drop the children that cannot move because the survivor already holds that key.
-- Ranking covers losers colliding with each other too, not just with the survivor:
-- one pair on prod has five members. Rows already on the survivor sort first.
DELETE FROM "question_answers" qa
WHERE (qa."discipline_teacher_id", qa."question_id", qa."user_id") IN (
  SELECT "discipline_teacher_id", "question_id", "user_id" FROM (
    SELECT q."discipline_teacher_id", q."question_id", q."user_id",
           row_number() OVER (
             PARTITION BY coalesce(m.keep_id, q."discipline_teacher_id"),
                          q."question_id", q."user_id"
             ORDER BY (m.keep_id IS NULL) DESC, q."updated_at" DESC NULLS LAST,
                      q."discipline_teacher_id"
           ) AS rn
    FROM "question_answers" q
    LEFT JOIN dt_merge m ON m.loser_id = q."discipline_teacher_id"
    WHERE coalesce(m.keep_id, q."discipline_teacher_id") IN (SELECT keep_id FROM dt_merge)
  ) x WHERE x.rn > 1
);

-- Postgres lets duplicate NULLs coexist in a unique index, so untyped roles never
-- collide and are left to move across untouched.
DELETE FROM "discipline_teacher_roles"
WHERE "id" IN (
  SELECT "id" FROM (
    SELECT r."id",
           row_number() OVER (
             PARTITION BY coalesce(m.keep_id, r."discipline_teacher_id"), r."discipline_type_id"
             ORDER BY (m.keep_id IS NULL) DESC, r."created_at", r."id"
           ) AS rn
    FROM "discipline_teacher_roles" r
    LEFT JOIN dt_merge m ON m.loser_id = r."discipline_teacher_id"
    WHERE r."discipline_type_id" IS NOT NULL
      AND coalesce(m.keep_id, r."discipline_teacher_id") IN (SELECT keep_id FROM dt_merge)
  ) x WHERE x.rn > 1
);

DELETE FROM "removed_discipline_teachers" rt
WHERE (rt."discipline_teacher_id", rt."student_id") IN (
  SELECT "discipline_teacher_id", "student_id" FROM (
    SELECT t."discipline_teacher_id", t."student_id",
           row_number() OVER (
             PARTITION BY coalesce(m.keep_id, t."discipline_teacher_id"), t."student_id"
             ORDER BY (m.keep_id IS NULL) DESC, t."created_at", t."discipline_teacher_id"
           ) AS rn
    FROM "removed_discipline_teachers" t
    LEFT JOIN dt_merge m ON m.loser_id = t."discipline_teacher_id"
    WHERE coalesce(m.keep_id, t."discipline_teacher_id") IN (SELECT keep_id FROM dt_merge)
  ) x WHERE x.rn > 1
);

-- Everything that survived the pass above now moves to the surviving pair.
UPDATE "question_answers" qa SET "discipline_teacher_id" = m.keep_id
  FROM dt_merge m WHERE qa."discipline_teacher_id" = m.loser_id;

UPDATE "discipline_teacher_roles" r SET "discipline_teacher_id" = m.keep_id
  FROM dt_merge m WHERE r."discipline_teacher_id" = m.loser_id;

UPDATE "removed_discipline_teachers" rt SET "discipline_teacher_id" = m.keep_id
  FROM dt_merge m WHERE rt."discipline_teacher_id" = m.loser_id;

DELETE FROM "discipline_teachers" dt USING dt_merge m WHERE dt."id" = m.loser_id;

DROP TABLE dt_merge;

-- Redundant once the unique index below leads with the same column.
DROP INDEX "discipline_teachers_discipline_id_idx";

CREATE UNIQUE INDEX "discipline_teachers_discipline_id_teacher_id_key" ON "discipline_teachers"("discipline_id", "teacher_id");
