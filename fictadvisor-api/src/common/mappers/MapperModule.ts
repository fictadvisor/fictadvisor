import { Module } from '@nestjs/common';
import { DisciplineMapper } from './DisciplineMapper';
import { DisciplineTeacherMapper } from './DisciplineTeacherMapper';
import { QuestionMapper } from './QuestionMapper';
import { RoleMapper } from './RoleMapper';
import { StudentMapper } from './StudentMapper';
import { SubjectMapper } from './SubjectMapper';
import { TeacherMapper } from './TeacherMapper';
import { UserMapper } from './UserMapper';
import { ScheduleMapper } from './ScheduleMapper';
import { GroupMapper } from './GroupMapper';
import { TelegramGroupMapper } from './TelegramGroupMapper';
import { CathedraMapper } from './CathedraMapper';
import { ResourceMapper } from './ResourceMapper';
import { EduProgramMapper } from './EduProgramMapper';
import { SpecialityMapper } from './SpecialityMapper';

@Module({
  providers: [
    DisciplineMapper,
    DisciplineTeacherMapper,
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
    EduProgramMapper,
    SpecialityMapper,
  ],
  exports: [
    DisciplineMapper,
    DisciplineTeacherMapper,
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
    EduProgramMapper,
    SpecialityMapper,
  ],
})
export class MapperModule {}
