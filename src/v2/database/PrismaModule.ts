import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { DisciplineTypeRepository } from '../api/discipline/DisciplineTypeRepository';
import { DisciplineRepository } from '../api/discipline/DisciplineRepository';
import { DisciplineTeacherRepository } from '../api/teacher/DisciplineTeacherRepository';
import { TeacherRepository } from '../api/teacher/TeacherRepository';
import { GroupRepository } from '../api/group/GroupRepository';

@Module({
  providers: [PrismaService, DisciplineTypeRepository, DisciplineRepository, DisciplineTeacherRepository, TeacherRepository, GroupRepository],
  exports: [PrismaService, DisciplineTypeRepository, DisciplineRepository, DisciplineTeacherRepository, TeacherRepository, GroupRepository],
})
export class PrismaModule {}