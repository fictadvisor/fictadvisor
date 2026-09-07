import { Injectable, Logger, Optional } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ParserTypeEnum } from '@fictadvisor/utils/enums';
import { StudyingSemester } from '../../date/v2/date.service';
import { GeneralParser } from './general-parser';
import { ParseGroupJobData } from './types/parse-plan.types';
import { PARSE_GROUP_JOB, PARSE_QUEUE } from './parse-queue.constants';

// How the schedule import is started. The shared prologue runs here, once, and each
// group becomes its own job -- so one group failing costs that group instead of the
// ~500 the old loop had not reached yet, a deploy landing mid-import loses at most the
// job in flight, and a failure lands in the queue with its payload and stack instead of
// a stderr line that dies with the container.
@Injectable()
export class ParseQueueService {
  private readonly logger = new Logger(ParseQueueService.name);

  constructor (
    private readonly generalParser: GeneralParser,
    // Absent whenever REDIS_URL is unset -- see the comment in ParserModule.
    @Optional() @InjectQueue(PARSE_QUEUE) private readonly queue?: Queue<ParseGroupJobData>,
  ) {}

  // The nightly run. Its dedupe key is the calendar day, so if the cron ever fires twice
  // -- two processes overlapping during a deploy, the case a `start-first` rollout would
  // create -- both enqueue the same job ids and BullMQ keeps one. That is the whole
  // double-fire problem solved at the data level, with no lock and no singleton worker.
  async enqueueNightly (parserType: ParserTypeEnum): Promise<number> {
    return this.enqueue(parserType, `nightly:${new Date().toISOString().slice(0, 10)}`);
  }

  // A hand-triggered run gets a fresh key every time: someone re-parsing after fixing
  // data must not be silently deduped against this morning's nightly run.
  async enqueueManual (
    parserType: ParserTypeEnum,
    groupList?: string[],
    period?: StudyingSemester,
    page?: number,
  ): Promise<number> {
    return this.enqueue(parserType, `manual:${Date.now()}`, groupList, period, page);
  }

  private async enqueue (
    parserType: ParserTypeEnum,
    dedupeKey: string,
    groupList?: string[],
    period?: StudyingSemester,
    page?: number,
  ): Promise<number> {
    // No Redis: run it inline, exactly as it ran before there was a queue.
    if (!this.queue) {
      await this.generalParser.parse(parserType, groupList, period, page);
      return 0;
    }

    const plan = await this.generalParser.plan(parserType, groupList, period, page);
    if (!plan) {
      this.logger.log('Nothing to parse: the current semester is over');
      return 0;
    }

    const { groups, ...context } = plan;

    await this.queue.addBulk(
      groups.map((group) => ({
        name: PARSE_GROUP_JOB,
        data: { ...context, group },
        opts: { jobId: `${dedupeKey}:${group.name}` },
      })),
    );

    this.logger.log(`Queued ${groups.length} group(s) to parse as "${dedupeKey}"`);
    return groups.length;
  }
}
