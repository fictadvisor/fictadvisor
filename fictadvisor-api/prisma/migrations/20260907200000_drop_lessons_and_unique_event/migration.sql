-- Step two of two. 20260907190000 put the discipline type on the event and
-- backfilled it; the new code has been reading that column since. This drops the
-- link table it replaced and finally states an event's natural key as a constraint.
--
-- Run this only once the new code is live. It is the mirror of the previous
-- migration: that one added and was safe under old code, this one removes and is
-- safe under new code. Nothing in the running app has touched `lessons` since the
-- previous deploy.
--
-- The key is (group, start, end, name, discipline type, period), which is exactly
-- what the parser's own matcher compares. The discipline type has to be in it:
-- campus really does publish a lecture and a practice in the same slot -- the
-- ІІ-53 timetable has "Економічна психологія" twice on Friday 10:25, tagged `lec`
-- and `prac` -- and the type is the only column that separates them.
--
-- 502 prod rows sit in sets that would violate it, 260 of them surplus, every one
-- in a past semester and not one carrying an event_info row; the current semester
-- is already clean. Ordering keeps a user-made event over a parsed one so nobody's
-- own entry is the half that goes, then the oldest.
--
-- Untyped events are deliberately left alone. Postgres treats NULLs as distinct,
-- so they cannot violate this index anyway: 1657 user-created events legitimately
-- have no type, and 4528 historical rows lost theirs to a cause nobody has
-- established. What the index cannot catch, a transaction around the per-group
-- parse has to prevent instead.

DELETE FROM "events"
WHERE "id" IN (
  SELECT "id" FROM (
    SELECT e."id",
           row_number() OVER (
             PARTITION BY e."group_id", e."start_time", e."end_time", e."name",
                          e."discipline_type_id", e."period"
             ORDER BY e."is_custom" DESC, e."created_at", e."id"
           ) AS rn
    FROM "events" e
    WHERE e."discipline_type_id" IS NOT NULL
  ) x WHERE x.rn > 1
);

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_discipline_type_id_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_event_id_fkey";

-- DropTable
DROP TABLE "lessons";

-- CreateIndex
CREATE UNIQUE INDEX "events_natural_key" ON "events"("group_id", "start_time", "end_time", "name", "discipline_type_id", "period");
