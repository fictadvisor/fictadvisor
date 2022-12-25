import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import { GroupModule } from './group/GroupModule';
import { UserModule } from './user/UserModule';


@Module({
  imports: [AuthModule, GroupModule, UserModule]
})
export class ApiModule {}