import { Module } from '@nestjs/common';
import { ScheduleParser } from './ScheduleParser';
import { PrismaModule } from '../../database/PrismaModule';

@Module({
  providers: [ScheduleParser],
  exports: [ScheduleParser],
  imports: [PrismaModule],
})
export class ParserModule {}
