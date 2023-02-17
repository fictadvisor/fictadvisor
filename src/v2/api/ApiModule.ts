import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import { GroupModule } from './group/GroupModule';
import { UserModule } from './user/UserModule';
import { TeacherModule } from './teacher/TeacherModule';
import { SubjectModule } from './subject/SubjectModule';
import { DisciplineModule } from './discipline/DisciplineModule';
import { PollModule } from './poll/PollModule';
import { ScheduleModule } from './schedule/ScheduleModule';
import { ResourceModule } from './resources/ResourceModule';


@Module({
  imports: [
    AuthModule,
    GroupModule,
    UserModule,
    TeacherModule,
    SubjectModule,
    DisciplineModule,
    PollModule,
    ScheduleModule,
    ResourceModule,
  ],
})
export class ApiModule {}