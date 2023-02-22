import { Module } from '@nestjs/common';
import { ScheduleParser } from './ScheduleParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../database/PrismaModule';

@Module({
  providers: [ScheduleParser, RozParser],
  exports: [ScheduleParser, RozParser],
  imports: [PrismaModule],
})
export class ParserModule {}