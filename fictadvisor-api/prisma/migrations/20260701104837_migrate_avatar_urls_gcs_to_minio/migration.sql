-- Data migration: rewrite legacy Firebase/GCS avatar URLs to the self-hosted
-- MinIO (S3) endpoint. Files were already copied GCS -> MinIO preserving keys
-- (whole bucket mirrored), so any `<bucket>/<key>` object exists in MinIO too.
--
-- GCS signed URL:  https://storage.googleapis.com/<gcs-bucket>/static/avatars/<hash>.<ext>?<sig>
-- MinIO URL:       https://storage.ficeadvisor.com/<minio-bucket>/static/avatars/<hash>.<ext>
--
-- One file runs on both environments; each DB only holds URLs for its own GCS
-- bucket, so only the matching UPDATE affects rows:
--   ficeadvisor-prod.appspot.com -> minio bucket `fictadvisor`      (prod DB)
--   ficeadvisor-dev.appspot.com  -> minio bucket `fictadvisor-dev`  (dev DB)
-- The query string is stripped; imgur/default avatars are left untouched.
-- Idempotent: after rewrite the URLs no longer match the GCS predicate.
-- Tables are the @@map'd names (users / teachers / verify_email_tokens).

-- ---- PROD bucket (ficeadvisor-prod.appspot.com -> fictadvisor) ----
UPDATE "users"
SET "avatar" = 'https://storage.ficeadvisor.com/fictadvisor/' ||
  split_part(regexp_replace("avatar", '\?.*$', ''), 'ficeadvisor-prod.appspot.com/', 2)
WHERE "avatar" LIKE 'https://storage.googleapis.com/ficeadvisor-prod.appspot.com/%';

UPDATE "teachers"
SET "avatar" = 'https://storage.ficeadvisor.com/fictadvisor/' ||
  split_part(regexp_replace("avatar", '\?.*$', ''), 'ficeadvisor-prod.appspot.com/', 2)
WHERE "avatar" LIKE 'https://storage.googleapis.com/ficeadvisor-prod.appspot.com/%';

UPDATE "verify_email_tokens"
SET "avatar" = 'https://storage.ficeadvisor.com/fictadvisor/' ||
  split_part(regexp_replace("avatar", '\?.*$', ''), 'ficeadvisor-prod.appspot.com/', 2)
WHERE "avatar" LIKE 'https://storage.googleapis.com/ficeadvisor-prod.appspot.com/%';

-- ---- DEV bucket (ficeadvisor-dev.appspot.com -> fictadvisor-dev) ----
UPDATE "users"
SET "avatar" = 'https://storage.ficeadvisor.com/fictadvisor-dev/' ||
  split_part(regexp_replace("avatar", '\?.*$', ''), 'ficeadvisor-dev.appspot.com/', 2)
WHERE "avatar" LIKE 'https://storage.googleapis.com/ficeadvisor-dev.appspot.com/%';

UPDATE "teachers"
SET "avatar" = 'https://storage.ficeadvisor.com/fictadvisor-dev/' ||
  split_part(regexp_replace("avatar", '\?.*$', ''), 'ficeadvisor-dev.appspot.com/', 2)
WHERE "avatar" LIKE 'https://storage.googleapis.com/ficeadvisor-dev.appspot.com/%';

UPDATE "verify_email_tokens"
SET "avatar" = 'https://storage.ficeadvisor.com/fictadvisor-dev/' ||
  split_part(regexp_replace("avatar", '\?.*$', ''), 'ficeadvisor-dev.appspot.com/', 2)
WHERE "avatar" LIKE 'https://storage.googleapis.com/ficeadvisor-dev.appspot.com/%';
