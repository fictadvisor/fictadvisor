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
import { DocumentModule } from '../modules/DocumentModule';
import { EntrantModule } from '../modules/EntrantModule';
import { AdmissionModule } from '../modules/AdmissionModule';
import { TelegramGroupModule } from '../modules/TelegramGroupModule';
import { PermissionModule } from '../modules/PermissionModule';

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
    DocumentModule,
    EntrantModule,
    AdmissionModule,
    TelegramGroupModule,
    PermissionModule,
  ],
})
export class ApiModule {}
