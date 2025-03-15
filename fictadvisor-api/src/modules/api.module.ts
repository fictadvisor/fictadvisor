import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';
import { DisciplineModule } from './discipline/discipline.module';
import { PollModule } from './poll/poll.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ResourceModule } from './resource/resource.module';
import { CathedraModule } from './cathedra/cathedra.module';
import { TelegramGroupModule } from './telegram-group/telegram-group.module';
import { PermissionModule } from './permission/permission.module';
import { StudentModule } from './student/student.module';
import { PageTextModule } from './page-text/page-text.module';
import { EduProgramModule } from './edu-program/edu-program.module';
import { SpecialityModule } from './speciality/speciality.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    GroupModule,
    TeacherModule,
    SubjectModule,
    DisciplineModule,
    PollModule,
    ScheduleModule,
    ResourceModule,
    CathedraModule,
    TelegramGroupModule,
    PermissionModule,
    StudentModule,
    PageTextModule,
    EduProgramModule,
    SpecialityModule,
    HealthModule,
  ],
})
export class ApiModule {}
