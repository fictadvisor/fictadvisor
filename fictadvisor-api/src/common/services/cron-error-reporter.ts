import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as process from 'node:process';
import { TelegramAPI } from '../../modules/telegram-api/telegram-api';

// @nestjs/schedule gives cron no way to report a failing job: `scheduler.orchestrator`
// builds every CronJob without an `errorHandler`, and cron@4 then swallows the
// rejection into a bare `console.error` (job.js:134-146). The process does not crash,
// the Nest logger never sees it, `HttpExceptionFilter` never sees it, and the one
// stderr line dies with the container watchtower replaces on the next deploy.
//
// The cost of that was measured, not guessed: in the week to 2026-09-07 three of seven
// nights ran a cron that stopped partway -- one night neither 03:00 job did anything at
// all -- and the reason was unrecoverable, because it had never been written anywhere.
//
// So attach a handler to every registered job and report down the channel HTTP 500s
// already use.
@Injectable()
export class CronErrorReporter {
  private readonly logger = new Logger('Cron');

  constructor (
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly telegramApi: TelegramAPI,
  ) {}

  // Only safe once the application has fully bootstrapped: SchedulerOrchestrator
  // creates and registers the jobs in its own `onApplicationBootstrap`, so anything
  // running earlier finds an empty registry and silently protects nothing.
  attach (): void {
    const jobs = this.schedulerRegistry.getCronJobs();

    for (const [name, job] of jobs) {
      job.errorHandler = (error: unknown) => void this.report(name, error);
    }

    // Also the answer to "are the crons even registered in this process?", which is
    // worth having in the log the day someone gates them behind a role.
    this.logger.log(
      jobs.size
        ? `Reporting failures for ${jobs.size} cron job(s): ${[...jobs.keys()].join(', ')}`
        : 'No cron jobs are registered in this process',
    );
  }

  private async report (name: string, error: unknown): Promise<void> {
    const details =
      error instanceof Error ? error.stack ?? error.message : String(error);

    this.logger.error(`Cron job "${name}" failed: ${details}`);

    let message = '';
    message += '🚨🚨🚨 FICTADVISOR CRON ERROR 🚨🚨🚨\n';
    message += `⚙️ Environment: ${process.env.NODE_ENV?.toUpperCase()}\n`;
    message += `⏰ Job: ${name}\n`;
    message += '\n📜 Stack Trace:\n';
    message += details;

    // Reporting must never be able to take the process down. An unreachable bot API
    // is exactly the kind of thing that happens at 03:00, and this runs detached from
    // any request, so a rejection here would be an unhandled one.
    try {
      await this.telegramApi.error(message);
    } catch (reportError) {
      this.logger.error(
        `Failed to report the failure of cron job "${name}" to Telegram: ${(reportError as Error).message}`,
      );
    }
  }
}
