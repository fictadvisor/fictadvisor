import { Module } from '@nestjs/common';
import { ScheduleController } from './ScheduleController';
import { ScheduleService } from './ScheduleService';
import { ParserModule } from '../../utils/parser/ParserModule';
import { GroupModule } from '../group/GroupModule';
import { DateModule } from '../../utils/date/DateModule';
import { SubjectModule } from '../subject/SubjectModule';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { JwtGuard } from '../../security/JwtGuard';
import { TeacherModule } from '../teacher/TeacherModule';
import { ScheduleRepository } from './ScheduleRepository';
import { GroupBySemesterLessonGuard } from '../../security/group-guard/GroupBySemesterLessonGuard';
import { GroupByTemporaryLessonGuard } from '../../security/group-guard/GroupByTemporaryLessonGuard';
import { PrismaModule } from '../../database/PrismaModule';

@Module({
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    JwtGuard,
    GroupBySemesterLessonGuard,
    GroupByTemporaryLessonGuard,
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
  ],
})
export class ScheduleModule {}