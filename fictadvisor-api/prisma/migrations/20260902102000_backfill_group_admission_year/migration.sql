-- `admission_year` was never supplied by the parser, so every group fell back to
-- the column default — the year it was first parsed. Whole cohorts imported in
-- one batch therefore share one wrong year (every group from the 2023 import
-- claims 2024, first-years and fourth-years alike).
--
-- The group code is the reliable source: KPI encodes the cohort's admission year
-- in the first digit of the numeric part (ІА-11 → 2021, ІА-з61 → 2026). Only the
-- last digit is encoded, so it is read against the current decade and pulled back
-- one when that would place the group in the future. Mirrors
-- `getAdmissionYearFromCode`.
UPDATE "groups"
SET "admission_year" = CASE
      WHEN derived."year" > EXTRACT(YEAR FROM CURRENT_DATE)::int THEN derived."year" - 10
      ELSE derived."year"
    END,
    "updated_at" = NOW()
FROM (
  SELECT "id",
         (EXTRACT(YEAR FROM CURRENT_DATE)::int / 10) * 10
           + substring("code" FROM '[0-9]')::int AS "year"
  FROM "groups"
  WHERE "code" ~ '[0-9]'
) AS derived
WHERE "groups"."id" = derived."id";
