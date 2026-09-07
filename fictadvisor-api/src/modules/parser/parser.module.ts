import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CampusParser } from './v2/campus-parser';
import { RozParser } from './v2/roz-parser';
import { PrismaModule } from '../../database/prisma.module';
import { DateModule } from '../date/date.module';
import { GeneralParser } from './v2/general-parser';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';
import { QUEUES_ENABLED } from '../queue/queue.module';
import { ParseQueueService } from './v2/parse-queue.service';
import { ParseGroupProcessor } from './v2/parse-group.processor';
import {
  PARSE_COMPLETED_RETENTION,
  PARSE_FAILED_RETENTION,
  PARSE_JOB_ATTEMPTS,
  PARSE_JOB_BACKOFF_MS,
  PARSE_QUEUE,
} from './v2/parse-queue.constants';

// Without a Redis connection (see QueueModule) neither the queue nor its worker is
// registered, and ParseQueueService parses inline in one loop, exactly as before.
const queueImports: DynamicModule[] = QUEUES_ENABLED
  ? [
    BullModule.registerQueue({
      name: PARSE_QUEUE,
      defaultJobOptions: {
        attempts: PARSE_JOB_ATTEMPTS,
        backoff: { type: 'exponential', delay: PARSE_JOB_BACKOFF_MS },
        removeOnComplete: PARSE_COMPLETED_RETENTION,
        removeOnFail: PARSE_FAILED_RETENTION,
      },
    }),
  ]
  : [];

const queueProviders: Provider[] = QUEUES_ENABLED ? [ParseGroupProcessor] : [];

@Module({
  providers: [CampusParser, RozParser, GeneralParser, ParseQueueService, ...queueProviders],
  exports: [CampusParser, RozParser, GeneralParser, ParseQueueService],
  imports: [
    PrismaModule,
    DateModule,
    GroupModule,
    UserModule,
    ...queueImports,
  ],
})
export class ParserModule {}
