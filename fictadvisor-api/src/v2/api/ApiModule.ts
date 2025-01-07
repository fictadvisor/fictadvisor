import { Module } from '@nestjs/common';
import { AuthModule } from '../modules/AuthModule';
import { GroupModule } from '../modules/GroupModule';
import { UserModule } from '../modules/UserModule';
import { TeacherModule } from '../modules/TeacherModule';
import { SubjectModule } from '../modules/SubjectModule';
import { DisciplineModule } from '../modules/DisciplineModule';
import { PollModule } from '../modules/PollModule';
import { ScheduleModule } from '../modules/ScheduleModule';
import { ResourceModule } from '../modules/ResourceModule';
import { CathedraModule } from '../modules/CathedraModule';
import { TelegramGroupModule } from '../modules/TelegramGroupModule';
import { PermissionModule } from '../modules/PermissionModule';
import { StudentModule } from '../modules/StudentModule';
import { PageTextModule } from '../modules/PageTextModule';
import { EduProgramModule } from '../modules/EduProgramModule';
import { SpecialityModule } from '../modules/SpecialityModule';
import { HealthModule } from '../modules/HealthModule';

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
