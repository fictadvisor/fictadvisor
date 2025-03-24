import { Module } from '@nestjs/common';
import { CathedraMapper } from './cathedra.mapper';
import { DisciplineMapper } from './discipline.mapper';
import { DisciplineTeacherMapper } from './discipline-teacher.mapper';
import { QuestionMapper } from './question.mapper';
import { RoleMapper } from './role.mapper';
import { StudentMapper } from './student.mapper';
import { SubjectMapper } from './subject.mapper';
import { TeacherMapper } from './teacher.mapper';
import { UserMapper } from './user.mapper';
import { ScheduleMapper } from './schedule.mapper';
import { GroupMapper } from './group.mapper';
import { TelegramGroupMapper } from './telegram-group.mapper';
import { ResourceMapper } from './resource.mapper';
import { EduProgramMapper } from './edu-program.mapper';
import { SpecialityMapper } from './speciality.mapper';

@Module({
  providers: [
    CathedraMapper,
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
    ResourceMapper,
    EduProgramMapper,
    SpecialityMapper,
  ],
  exports: [
    CathedraMapper,
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
    ResourceMapper,
    EduProgramMapper,
    SpecialityMapper,
  ],
})
export class MapperModule {}
