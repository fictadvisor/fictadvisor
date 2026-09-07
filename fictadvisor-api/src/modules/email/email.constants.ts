// Queue and job identity, kept in one place so the producer (EmailQueueService)
// and the consumer (EmailProcessor) can never drift apart.
export const EMAIL_QUEUE = 'email';
export const SEND_EMAIL_JOB = 'send';

// Redis namespace for the queue, sitting next to `fa:metrics`. Prod and dev
// already run on separate Redis databases (REDIS_URL .../0 vs .../1), so this
// is namespace hygiene rather than the thing that keeps them apart.
export const EMAIL_QUEUE_PREFIX = process.env.EMAIL_QUEUE_PREFIX || 'fa:queue';

// A send is retried well past the point where a transient SMTP failure (Gmail
// throttling, a dropped TLS handshake) would have cleared: 30s, 1m, 2m, 4m, so
// the last attempt lands ~8 minutes in. Both tokens the emails carry live an
// hour, so a job that exhausts its attempts was never going to arrive in time.
export const EMAIL_JOB_ATTEMPTS = 5;
export const EMAIL_JOB_BACKOFF_MS = 30 * 1000;

// The transport opens a fresh connection per send (no `pool` on MailerModule),
// so this is a cap on simultaneous SMTP handshakes rather than on throughput.
// Volume is single-digit emails per day; this only matters when a backlog drains.
export const EMAIL_QUEUE_CONCURRENCY = 3;
