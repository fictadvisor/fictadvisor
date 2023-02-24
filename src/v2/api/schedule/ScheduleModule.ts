import { Module } from '@nestjs/common';
import { ScheduleController } from './ScheduleController';
import { ScheduleService } from './ScheduleService';
import { ParserModule } from '../../utils/parser/ParserModule';
import { GroupModule } from '../group/GroupModule';
import { DateModule } from '../../utils/date/DateModule';
import { SubjectModule } from '../subject/SubjectModule';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { ScheduleRepository } from './ScheduleRepository';
import { PrismaModule } from '../../database/PrismaModule';
import { AccessModule } from 'src/v2/security/AccessModule';

@Module({
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    ScheduleRepository,
  ],
  exports: [ScheduleService],
  imports: [
    ParserModule,
    GroupModule,
    DateModule,
    SubjectModule,
    DisciplineModule,
    TeacherModule,
    PrismaModule,
    AccessModule,
  ],
})
export class ScheduleModule {}