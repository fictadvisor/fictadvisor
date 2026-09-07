import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

// One place that decides whether there are queues at all, and on which Redis.
//
// Redis is optional for the same reason it is optional in MetricsStore: neither
// `.development.env` nor `.testing.env` carries a REDIS_URL, and the unit and
// integration runs build the app without one. With no Redis nothing here is
// registered, and each producer falls back to doing its work inline -- emails sent on
// the request, the schedule parsed in one long loop -- which is exactly how both
// behaved before they were queued.
const redisUrl = process.env.REDIS_URL;

export const QUEUES_ENABLED = !!redisUrl;

// Namespaced next to `fa:metrics`. EMAIL_QUEUE_PREFIX is still honoured because it
// shipped first and may be set somewhere; prod and dev are kept apart by the database
// index in REDIS_URL (.../0 vs .../1) rather than by this.
export const QUEUE_PREFIX =
  process.env.QUEUE_PREFIX || process.env.EMAIL_QUEUE_PREFIX || 'fa:queue';

const connection: DynamicModule[] = redisUrl
  ? [BullModule.forRoot({ connection: { url: redisUrl }, prefix: QUEUE_PREFIX })]
  : [];

// `BullModule.forRoot` registers itself globally, so registering it once here is what
// lets every feature module get away with a bare `registerQueue`.
@Module({ imports: connection })
export class QueueModule {}
