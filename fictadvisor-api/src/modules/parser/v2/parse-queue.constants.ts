// Queue and job identity, in one place so producer and consumer cannot drift.
export const PARSE_QUEUE = 'parse';
export const PARSE_GROUP_JOB = 'group';

// One at a time, deliberately. The old loop was sequential too, so this costs nothing
// against today, and it buys two things back: campus is not hit in parallel by a
// stranger, and `getOrCreate` for a teacher or a discipline cannot race itself --
// `teachers` and `events` are protected by unique indexes now, but `discipline_types`
// is not, and a burst of parallel writers would be a new way to duplicate rows.
export const PARSE_QUEUE_CONCURRENCY = 1;

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
