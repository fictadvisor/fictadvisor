import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { DisciplineTypeRepository } from '../api/discipline/DisciplineTypeRepository';
import { DisciplineRepository } from '../api/discipline/DisciplineRepository';
import { DisciplineTeacherRepository } from '../api/teacher/DisciplineTeacherRepository';
import { TeacherRepository } from '../api/teacher/TeacherRepository';
import { GroupRepository } from '../api/group/GroupRepository';
import { DisciplineTeacherRoleRepository } from '../api/teacher/DisciplineTeacherRoleRepository';
import { SubjectRepository } from '../api/subject/SubjectRepository';
import { ScheduleRepository } from '../api/schedule/ScheduleRepository';

@Module({
  providers: [
    PrismaService,
    DisciplineTypeRepository,
    DisciplineRepository,
    DisciplineTeacherRepository,
    DisciplineTeacherRoleRepository,
    TeacherRepository,
    GroupRepository,
    SubjectRepository,
    ScheduleRepository,
  ],
  exports: [
    PrismaService,
    DisciplineTypeRepository,
    DisciplineRepository,
    DisciplineTeacherRepository,
    DisciplineTeacherRoleRepository,
    TeacherRepository,
    GroupRepository,
    SubjectRepository,
    ScheduleRepository,
  ],
})
export class PrismaModule {}
