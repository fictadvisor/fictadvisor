import { Module } from '@nestjs/common';
import { ScheduleController } from '../api/controllers/ScheduleController';
import { ScheduleService } from '../api/services/ScheduleService';
import { ParserModule } from '../utils/parser/ParserModule';
import { GroupModule } from './GroupModule';
import { DateModule } from '../utils/date/DateModule';
import { DisciplineModule } from './DisciplineModule';
import { TeacherModule } from './TeacherModule';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from 'src/v2/modules/AccessModule';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
  imports: [
    ParserModule,
    GroupModule,
    DateModule,
    DisciplineModule,
    TeacherModule,
    PrismaModule,
    AccessModule,
  ],
})
export class ScheduleModule {}