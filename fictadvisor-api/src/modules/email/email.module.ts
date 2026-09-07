import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailService } from './email.service';
import { EmailQueueService } from './email-queue.service';
import { EmailProcessor } from './email.processor';
import {
  EMAIL_JOB_ATTEMPTS,
  EMAIL_JOB_BACKOFF_MS,
  EMAIL_QUEUE,
} from './email.constants';
import { QUEUES_ENABLED } from '../queue/queue.module';
import { join } from 'path';

// The connection itself lives in QueueModule; without it neither the queue nor its
// worker is registered, EmailQueueService sends inline, and emails behave exactly as
// they did before the queue existed.
const queueImports: DynamicModule[] = QUEUES_ENABLED
  ? [
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
      defaultJobOptions: {
        attempts: EMAIL_JOB_ATTEMPTS,
        backoff: { type: 'exponential', delay: EMAIL_JOB_BACKOFF_MS },
        // Completed jobs are kept just long enough to answer "did it go out?",
        // failures for a week so a bad SMTP night is still visible on Monday.
        // Both are capped by count as well as age because this Redis runs
        // `maxmemory-policy noeviction`: an unbounded set would eventually start
        // rejecting writes for the metrics snapshots sharing the instance.
        removeOnComplete: { age: 60 * 60, count: 200 },
        removeOnFail: { age: 7 * 24 * 60 * 60, count: 500 },
      },
    }),
  ]
  : [];

const queueProviders: Provider[] = QUEUES_ENABLED ? [EmailProcessor] : [];

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        secure: false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: '"FICT Advisor" <noreply@fictadvisor.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ...queueImports,
  ],
  providers: [EmailService, EmailQueueService, ...queueProviders],
  // Only the queue is exported: EmailService stays internal so a new caller
  // cannot accidentally reintroduce a blocking SMTP send on a request path.
  exports: [EmailQueueService],
})
export class EmailModule {}
