-- Captain roles were created with only the `groups.<id>.*` wildcard, so the
-- permission layer reported `groups.<id>.leave` as allowed while the service
-- rejected it — every captain saw a "leave group" button that always 403'd.
-- Backfill the explicit denial that new groups now get from ROLE_LIST.
INSERT INTO "grants" ("id", "role_id", "permission", "set", "weight")
SELECT gen_random_uuid()::text, r."id", 'groups.' || gr."groupId" || '.leave', false, 2
FROM "roles" r
JOIN "group_roles" gr ON gr."roleId" = r."id"
WHERE r."name" = 'CAPTAIN'
  AND NOT EXISTS (
    SELECT 1
    FROM "grants" g
    WHERE g."role_id" = r."id"
      AND g."permission" = 'groups.' || gr."groupId" || '.leave'
  );

-- A graduated group has nothing left to hold together, so its captain may leave.
-- Mirrors `GroupService.openLeaveForGraduatedGroups`, which keeps this current
-- from here on; doing it here means the state is already right on deploy.
UPDATE "grants" g
SET "set" = true, "updated_at" = NOW()
FROM "roles" r
JOIN "group_roles" gr ON gr."roleId" = r."id"
JOIN "groups" grp ON grp."id" = gr."groupId"
WHERE g."role_id" = r."id"
  AND r."name" = 'CAPTAIN'
  AND g."permission" = 'groups.' || gr."groupId" || '.leave'
  AND g."set" = false
  AND grp."admission_year" <= (
    SELECT CASE
             WHEN s."semester" = 2 AND s."end_date" < NOW() THEN s."year" - 3
             ELSE s."year" - 4
           END
    FROM "semester_dates" s
    WHERE s."start_date" <= NOW()
    ORDER BY s."start_date" DESC
    LIMIT 1
  );
