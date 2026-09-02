-- Group codes are the parser's key: `getOrCreate({ code })` reuses whatever row
-- wears the code, so a duplicate silently splits or merges a group's schedule.
-- Nothing forbade one until now — `create` and `updateGroup` accept any code, and
-- two concurrent parses could both miss the lookup and both insert.
--
-- Safe to apply as-is: prod and dev both held zero duplicate codes when this was
-- written. If it ever fails on another database, that database has duplicates
-- that need merging by hand first — the query below finds them.
--   SELECT code, count(*) FROM groups GROUP BY code HAVING count(*) > 1;
CREATE UNIQUE INDEX "groups_code_key" ON "groups"("code");
