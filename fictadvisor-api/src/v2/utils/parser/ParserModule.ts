import { Module } from '@nestjs/common';
import { ScheduleParser } from './ScheduleParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../modules/PrismaModule';
import { DateModule } from '../date/DateModule';
import { TeacherModule } from '../../modules/TeacherModule';

@Module({
  providers: [ScheduleParser, RozParser],
  exports: [ScheduleParser, RozParser],
  imports: [PrismaModule, DateModule, TeacherModule],
})
export class ParserModule {}