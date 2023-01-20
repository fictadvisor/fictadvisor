import { Module } from '@nestjs/common';
import { PollController } from './PollController';
import { PollService } from './PollService';
import { PrismaService } from '../../database/PrismaService';
import { GroupByDisciplineTeacherGuard } from '../../security/group-guard/GroupByDisciplineTeacherGuard';
import { GroupModule } from '../group/GroupModule';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { TeacherModule } from '../teacher/TeacherModule';

@Module({
  controllers: [PollController],
  providers: [PollService, PrismaService, GroupByDisciplineTeacherGuard],
  exports: [PollService],
  imports: [GroupModule, DisciplineModule, TeacherModule],
})
export class PollModule {}
