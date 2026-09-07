import { Logger } from '@nestjs/common';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from './email.service';
import { EMAIL_QUEUE, EMAIL_QUEUE_CONCURRENCY } from './email.constants';
import { EmailJobData } from './types/email-job.data';
import { fromEmailJob } from './email-job.mapper';

// Consumes what EmailQueueService produces. It is registered in the same process
// as the API for now; splitting it into a dedicated worker service is a separate
// piece of work and needs no change here -- the queue is already the seam.
@Processor(EMAIL_QUEUE, { concurrency: EMAIL_QUEUE_CONCURRENCY })
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor (private readonly emailService: EmailService) {
    super();
  }

  async process (job: Job<EmailJobData>) {
    await this.emailService.sendEmail(fromEmailJob(job.data));
  }

  @OnWorkerEvent('failed')
  onFailed (job: Job<EmailJobData> | undefined, error: Error) {
    // BullMQ retries on its own until `attempts` runs out; only the last failure
    // means an email was actually lost, so say which one that was.
    const attempt = job ? `${job.attemptsMade}/${job.opts.attempts ?? 1}` : 'unknown';
    this.logger.error(`Email job ${job?.id} failed (attempt ${attempt}): ${error.message}`);
  }

  @OnWorkerEvent('error')
  onError (error: Error) {
    // The worker's own errors (a dropped Redis connection, a failed lock renewal)
    // arrive here. An 'error' event with no listener is an unhandled throw on an
    // EventEmitter, and a side-channel must never be able to take the API down.
    this.logger.error(`Email worker error: ${error.message}`);
  }
}
