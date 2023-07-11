import { Module } from '@nestjs/common';
import { ScheduleParser } from './ScheduleParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../modules/PrismaModule';
import { DateModule } from '../date/DateModule';

@Module({
  providers: [ScheduleParser, RozParser],
  exports: [ScheduleParser, RozParser],
  imports: [PrismaModule, DateModule],
})
export class ParserModule {}