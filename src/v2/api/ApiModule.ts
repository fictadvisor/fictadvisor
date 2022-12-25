import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import { GroupModule } from './group/GroupModule';


@Module({
  imports: [AuthModule, GroupModule]
})
export class ApiModule {}