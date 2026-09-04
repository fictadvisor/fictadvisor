-- A subject is identified by its name everywhere it matters: the parser resolves
-- one with `findOne({ name }) ?? create({ name })`, and the selective import
-- matches the CSV's subject column against it. A second row wearing the same
-- name silently splits one subject in two — half the disciplines hang off the
-- duplicate, and whichever row `findFirst` reaches first decides what an import
-- updates while the other half drifts.
--
-- The same holds one level down: a group cannot study the same subject twice in
-- one semester, yet nothing forbade a second `disciplines` row for the same
-- (subject, group, year, semester). Both writers of that table are a
-- `findOne ?? create` pair, so two concurrent parses can both miss and insert.
--
-- Prod held zero duplicates of either kind when this was written (659 subjects,
-- 16974 disciplines). Dev did NOT: 1298 duplicate discipline rows, all in 2024/1
-- and 2024/2, plus one duplicate subject name. They have to be merged away
-- before this applies there — these queries find them:
--   SELECT name, count(*) FROM subjects GROUP BY name HAVING count(*) > 1;
--   SELECT subject_id, group_id, year, semester, count(*) FROM disciplines
--     GROUP BY 1, 2, 3, 4 HAVING count(*) > 1;

-- Redundant once the unique index below leads with the same column.
DROP INDEX "disciplines_subject_id_idx";

CREATE UNIQUE INDEX "disciplines_subject_id_group_id_year_semester_key" ON "disciplines"("subject_id", "group_id", "year", "semester");

CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");
