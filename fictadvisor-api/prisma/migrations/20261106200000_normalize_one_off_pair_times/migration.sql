-- Data migration: store campus one-off pairs in the same time encoding as every other pair.
--
-- Pair times are stored as the Kyiv wall clock written with the Kyiv UTC offset of the
-- SEMESTER START (+03 for an autumn semester, +02 for a spring one);
-- ScheduleHelperService.addTimezone undoes that offset on every read. CampusParser.mapDate
-- (pairs campus lists with explicit `dates`, saved as NO_PERIOD) stored the true instant
-- instead, so every such pair on the other side of a DST switch from its semester start
-- showed up an hour off: an hour late after 25 October 2026, an hour early after 29 March
-- 2026. The parser now writes the semester-offset encoding; this rewrites what it saved
-- before.
--
-- Rows touched: parser rows (is_custom = false) with period NO_PERIOD whose own Kyiv offset
-- differs from their semester start's, AND whose time lands on the KPI pair grid when read
-- as a true instant but not when read in the semester encoding. The grid test is what
-- separates them from the 2023-era user-made events (exams, consultations, "test") that
-- predate the is_custom flag: those went through ScheduleTimeConvertPipe and are already
-- in the semester encoding, so they must not move. Measured on prod 2026-11-06: 12,179 rows
-- to shift, 492 look-alikes left alone.
--
-- Shift = (own offset - semester offset) hours; e.g. 2026-11-02T06:30Z (08:30 EET) becomes
-- 05:30Z, which addTimezone turns back into 08:30 Kyiv. Done in place, so ids and event_info
-- survive. A row whose shifted copy already exists (prod: one pair on 2026-04-02 stored both
-- ways) is a duplicate; it is deleted if it has no event_info, and otherwise the unique key
-- aborts the migration rather than lose anything.
--
-- Not idempotent by data alone (a shifted row can look like an unshifted one), which is why
-- this is a migration: _prisma_migrations makes sure it runs once.

CREATE TEMP TABLE "one_off_shift" AS
WITH "grid"("t") AS (
  VALUES ('08:30'), ('10:25'), ('12:20'), ('14:15'), ('16:10'), ('18:05'), ('20:00')
),
"offsets" AS (
  SELECT
    e."id",
    e."start_time",
    (extract(epoch FROM (e."start_time" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Kyiv') - e."start_time") / 3600)::int AS "own_offset",
    (extract(epoch FROM (s."start_date" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Kyiv') - s."start_date") / 3600)::int AS "semester_offset"
  FROM "events" e
  JOIN "semester_dates" s ON e."start_time" >= s."start_date" AND e."start_time" < s."end_date"
  WHERE e."period" = 'NO_PERIOD' AND e."is_custom" = false
)
SELECT o."id", make_interval(hours => o."own_offset" - o."semester_offset") AS "shift"
FROM "offsets" o
WHERE o."own_offset" <> o."semester_offset"
  AND to_char(o."start_time" + make_interval(hours => o."own_offset"), 'HH24:MI') IN (SELECT "t" FROM "grid")
  AND to_char(o."start_time" + make_interval(hours => o."semester_offset"), 'HH24:MI') NOT IN (SELECT "t" FROM "grid");

-- A shifted row would collide with its own already-correct copy: drop the wrong one.
DELETE FROM "events" e
USING "one_off_shift" x
WHERE e."id" = x."id"
  AND NOT EXISTS (SELECT 1 FROM "event_info" i WHERE i."event_id" = e."id")
  AND EXISTS (
    SELECT 1 FROM "events" d
    WHERE d."id" <> e."id"
      AND d."group_id" = e."group_id"
      AND d."name" = e."name"
      AND d."discipline_type_id" IS NOT DISTINCT FROM e."discipline_type_id"
      AND d."period" = e."period"
      AND d."start_time" = e."start_time" + x."shift"
      AND d."end_time" = e."end_time" + x."shift"
  );

UPDATE "events" e
SET "start_time" = e."start_time" + x."shift",
    "end_time"   = e."end_time" + x."shift"
FROM "one_off_shift" x
WHERE e."id" = x."id";

DROP TABLE "one_off_shift";
