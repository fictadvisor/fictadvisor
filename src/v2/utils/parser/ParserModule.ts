import { Module } from '@nestjs/common';
import { ScheduleParser } from './ScheduleParser';
import { PrismaService } from '../../database/PrismaService';

@Module({
  providers: [ScheduleParser, PrismaService],
  exports: [ScheduleParser],
})
export class ParserModule {}