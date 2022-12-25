import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import { GroupModule } from './group/GroupModule';
import { UserModule } from './user/UserModule';
import { TeacherModule } from './teacher/TeacherModule';


@Module({
  imports: [AuthModule, GroupModule, UserModule, TeacherModule]
})
export class ApiModule {}