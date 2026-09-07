import { Injectable, Logger, Optional } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EmailService } from './email.service';
import { EMAIL_QUEUE, SEND_EMAIL_JOB } from './email.constants';
import { EmailOptionsData } from './types/email-options.data';
import { EmailJobData } from './types/email-job.data';
import { toEmailJob } from './email-job.mapper';

// The way the rest of the app asks for an email. Callers hand over the same
// EmailOptionsData they used to pass to EmailService and get back a promise that
// resolves once the send is *durably queued*, not once SMTP has accepted it --
// registration and password recovery used to spend most of their request time
// waiting on a Gmail handshake that the user has no reason to wait for.
@Injectable()
export class EmailQueueService {
  private readonly logger = new Logger(EmailQueueService.name);

  constructor (
    private readonly emailService: EmailService,
    // Absent whenever REDIS_URL is unset -- see the comment in EmailModule.
    @Optional() @InjectQueue(EMAIL_QUEUE) private readonly queue?: Queue<EmailJobData>,
  ) {}

  async sendEmail (options: EmailOptionsData) {
    if (!this.queue) {
      return this.emailService.sendEmail(options);
    }

    try {
      await this.queue.add(SEND_EMAIL_JOB, toEmailJob(options));
    } catch (error) {
      // Redis is unreachable. Sending inline costs the caller the ~1.2s it used
      // to cost anyway, which beats silently dropping a password reset -- the
      // failure is worth a log line, not an outage.
      this.logger.error(
        `Failed to queue an email, falling back to sending it inline: ${(error as Error).message}`,
      );
      return this.emailService.sendEmail(options);
    }
  }
}
