import { Logger } from '@nestjs/common';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { GeneralParser } from './general-parser';
import { ParseGroupJobData } from './types/parse-plan.types';
import {
  PARSE_MAX_STALLED_COUNT,
  PARSE_QUEUE,
  PARSE_QUEUE_CONCURRENCY,
} from './parse-queue.constants';

// Imports one group. Everything it writes goes through a single transaction inside
// `parseGroup`, so a job that dies half way -- a deploy, an OOM, a campus timeout after
// the first write -- leaves the group untouched and is retried whole.
@Processor(PARSE_QUEUE, {
  concurrency: PARSE_QUEUE_CONCURRENCY,
  maxStalledCount: PARSE_MAX_STALLED_COUNT,
})
export class ParseGroupProcessor extends WorkerHost {
  private readonly logger = new Logger(ParseGroupProcessor.name);

  constructor (private readonly generalParser: GeneralParser) {
    super();
  }

  async process (job: Job<ParseGroupJobData>) {
    await this.generalParser.parseGroupJob(job.data);
  }

  @OnWorkerEvent('failed')
  onFailed (job: Job<ParseGroupJobData> | undefined, error: Error) {
    // Deliberately not routed to Telegram the way a failing cron is: a bad night could
    // mean hundreds of these, and the payload and stack are already on the job in the
    // `failed` set, which is where anyone diagnosing this will look.
    const attempt = job ? `${job.attemptsMade}/${job.opts.attempts ?? 1}` : 'unknown';
    this.logger.error(
      `Parsing group "${job?.data.group.name ?? '?'}" failed (attempt ${attempt}): ${error.message}`,
    );
  }

  @OnWorkerEvent('error')
  onError (error: Error) {
    // The worker's own errors -- a dropped Redis connection, a failed lock renewal.
    // An 'error' event with no listener is an unhandled throw on an EventEmitter.
    this.logger.error(`Parse worker error: ${error.message}`);
  }
}
