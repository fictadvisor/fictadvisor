import { Module } from '@nestjs/common';
import { DisciplineMapper } from '../mappers/DisciplineMapper';
import { DisciplineTeacherMapper } from '../mappers/DisciplineTeacherMapper';
import { GrantMapper } from '../mappers/GrantMapper';
import { QuestionMapper } from '../mappers/QuestionMapper';
import { RoleMapper } from '../mappers/RoleMapper';
import { StudentMapper } from '../mappers/StudentMapper';
import { SubjectMapper } from '../mappers/SubjectMapper';
import { TeacherMapper } from '../mappers/TeacherMapper';
import { UserMapper } from '../mappers/UserMapper';
import { ScheduleMapper } from '../mappers/ScheduleMapper';

@Module({
  providers: [
    DisciplineMapper,
    DisciplineTeacherMapper,
    GrantMapper,
    QuestionMapper,
    RoleMapper,
    StudentMapper,
    SubjectMapper,
    TeacherMapper,
    UserMapper,
    ScheduleMapper,
  ],
  exports: [
    DisciplineMapper,
    DisciplineTeacherMapper,
    GrantMapper,
    QuestionMapper,
    RoleMapper,
    StudentMapper,
    SubjectMapper,
    TeacherMapper,
    UserMapper,
    ScheduleMapper,
  ],
})
export class MapperModule {}