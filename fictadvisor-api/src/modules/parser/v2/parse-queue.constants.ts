// Queue and job identity, in one place so producer and consumer cannot drift.
export const PARSE_QUEUE = 'parse';
export const PARSE_GROUP_JOB = 'group';

// How many groups are imported at once. Defaults to one, which is what the old loop
// did, so an environment that sets nothing behaves exactly as before.
//
// What actually bounds this, measured rather than assumed:
//   - Campus does not: 120 requests at 71/s came back 200 with no latency drift and
//     no 429, and the whole fetch is under 10% of the import anyway (~44ms x 630
//     groups against a ~300s run). The rest is Postgres.
//   - The connection pool does: every concurrent import holds one connection for the
//     length of its transaction, on top of ordinary request traffic. `connection_limit`
//     in FICTADVISOR_DATABASE_URL is the ceiling.
//   - Contention does, mildly: only `subjects` and `teachers` are shared between
//     groups -- everything else (disciplines, discipline types, discipline teachers,
//     events) hangs off a group -- and both are reached through upserts now, so a
//     collision is resolved by Postgres instead of aborting the transaction.
export const PARSE_QUEUE_CONCURRENCY =
  parseInt(process.env.PARSE_QUEUE_CONCURRENCY ?? '') || 1;

// A group that failed on a campus hiccup is worth retrying, but not for long: the
// nightly import has all night, and a group that fails three times an hour apart is
// broken rather than unlucky.
export const PARSE_JOB_ATTEMPTS = 3;
export const PARSE_JOB_BACKOFF_MS = 60 * 1000;

// A job whose process is killed -- which is exactly what a deploy does -- is not failed,
// it is *stalled*, and BullMQ recovers it on the stalled check. The default lets that
// happen only once before the job is failed for good; a deploy plus an unlucky restart
// should not cost a group its import.
export const PARSE_MAX_STALLED_COUNT = 3;

// A night is ~630 jobs. Completed ones are kept a day, which is what makes the nightly
// dedupe key work; failures are kept a fortnight so a bad week is still readable.
export const PARSE_COMPLETED_RETENTION = { age: 24 * 60 * 60, count: 1000 };
export const PARSE_FAILED_RETENTION = { age: 14 * 24 * 60 * 60, count: 2000 };
