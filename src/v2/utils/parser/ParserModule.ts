import { Module } from '@nestjs/common';
import { ScheduleParser } from './ScheduleParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../database/PrismaModule';
import { GroupModule } from '../../api/group/GroupModule';

@Module({
  providers: [ScheduleParser, RozParser],
  exports: [ScheduleParser, RozParser],
  imports: [PrismaModule, GroupModule],
})
export class ParserModule {}