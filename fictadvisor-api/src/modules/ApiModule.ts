import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import { GroupModule } from './group/GroupModule';
import { UserModule } from './user/UserModule';
import { TeacherModule } from './teacher/TeacherModule';
import { SubjectModule } from './subject/SubjectModule';
import { DisciplineModule } from './discipline/DisciplineModule';
import { PollModule } from './poll/PollModule';
import { ScheduleModule } from './schedule/ScheduleModule';
import { ResourceModule } from './resource/ResourceModule';
import { CathedraModule } from './cathedra/CathedraModule';
import { TelegramGroupModule } from './telegram-group/TelegramGroupModule';
import { PermissionModule } from './permission/PermissionModule';
import { StudentModule } from './student/StudentModule';
import { PageTextModule } from './page-text/PageTextModule';
import { EduProgramModule } from './edu-program/EduProgramModule';
import { SpecialityModule } from './speciality/SpecialityModule';
import { HealthModule } from './health/HealthModule';

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
