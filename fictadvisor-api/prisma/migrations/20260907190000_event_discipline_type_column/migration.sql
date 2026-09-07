-- Step one of two, replacing the `lessons` link table with a column on `events`.
--
-- `lessons` never held anything but `event_id` + `discipline_type_id`, and it never
-- held more than one row per event: 58838 events with exactly one lesson, 6185 with
-- none, zero with two, zero lessons with a null type, zero pointing at a missing
-- event. Every read in the app already spells it `lessons[0]?.disciplineType`. So the
-- link table is indirection, and it is also the reason the natural key of an event
-- -- (group, start, end, name, discipline type, period) -- cannot be expressed as a
-- constraint: one of its columns lives in another table.
--
-- This migration is deliberately **additive only**, because the API is redeployed by
-- watchtower stopping the old container and starting the new one: for a few minutes
-- the running code is the old one. It does not know this column and never selects
-- `*`, so it carries on against `lessons` untouched. Dropping that table and adding
-- the unique index is a separate migration that runs only once the new code is live.

ALTER TABLE "events" ADD COLUMN "discipline_type_id" TEXT;

UPDATE "events" e
SET "discipline_type_id" = l."discipline_type_id"
FROM "lessons" l
WHERE l."event_id" = e."id";

CREATE INDEX "events_discipline_type_id_idx" ON "events"("discipline_type_id");

ALTER TABLE "events" ADD CONSTRAINT "events_discipline_type_id_fkey"
  FOREIGN KEY ("discipline_type_id") REFERENCES "discipline_types"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
