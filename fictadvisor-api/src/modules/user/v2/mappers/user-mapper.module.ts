import { Module } from '@nestjs/common';
import { UserProfile } from './user.profile';
import { RoleProfile } from './role.profile';

@Module({
  providers: [UserProfile, RoleProfile],
  exports: [UserProfile, RoleProfile],
})
export class UserMapperModule {}
