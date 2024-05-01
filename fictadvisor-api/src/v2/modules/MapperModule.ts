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
import { GroupMapper } from '../mappers/GroupMapper';
import { EntrantMapper } from '../mappers/EntrantMapper';
import { TelegramGroupMapper } from '../mappers/TelegramGroupMapper';
import { CathedraMapper } from '../mappers/CathedraMapper';
import { ResourceMapper } from '../mappers/ResourceMapper';
import { DisciplineResourceMapper } from '../mappers/DisciplineResourceMapper';

@Module({
  providers: [
    DisciplineMapper,
    DisciplineTeacherMapper,
    EntrantMapper,
    GrantMapper,
    QuestionMapper,
    RoleMapper,
    StudentMapper,
    SubjectMapper,
    TeacherMapper,
    UserMapper,
    ScheduleMapper,
    GroupMapper,
    TelegramGroupMapper,
    CathedraMapper,
    ResourceMapper,
    DisciplineResourceMapper,
  ],
  exports: [
    DisciplineMapper,
    DisciplineTeacherMapper,
    EntrantMapper,
    GrantMapper,
    QuestionMapper,
    RoleMapper,
    StudentMapper,
    SubjectMapper,
    TeacherMapper,
    UserMapper,
    ScheduleMapper,
    GroupMapper,
    TelegramGroupMapper,
    CathedraMapper,
    ResourceMapper,
    DisciplineResourceMapper,
  ],
})
export class MapperModule {}