import { Module } from '@nestjs/common';
import { CathedraProfile } from './cathedra.profile';
import { DisciplineProfile } from './discipline.profile';
import { DisciplineTeacherProfile } from './discipline-teacher.profile';
import { QuestionProfile } from './question.profile';
import { RoleProfile } from './role.profile';
import { StudentProfile } from './student.profile';
import { SubjectProfile } from './subject.profile';
import { TeacherProfile } from './teacher.profile';
import { UserProfile } from './user.profile';
import { ScheduleProfile } from './schedule.profile';
import { GroupProfile } from './group.profile';
import { TelegramGroupProfile } from './telegram-group.profile';
import { ResourceProfile } from './resource.profile';
import { EduProgramProfile } from './edu-program.profile';
import { SpecialityProfile } from './speciality.profile';

@Module({
  providers: [
    CathedraProfile,
    DisciplineProfile,
    RoleProfile,
    TelegramGroupProfile,
    GroupProfile,
    StudentProfile,
    SubjectProfile,
    TeacherProfile,
    QuestionProfile,
    DisciplineTeacherProfile,
    UserProfile,
    ScheduleProfile,
    ResourceProfile,
    EduProgramProfile,
    SpecialityProfile,
  ],
})
export class MapperModule {}
