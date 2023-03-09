import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './UserService';
import { UserController } from './UserController';
import { ConfigurationModule } from '../../config/ConfigModule';
import { RoleService } from './role/RoleService';
import { RoleController } from './role/RoleController';
import { GrantService } from './grant/GrantService';
import { AuthModule } from '../auth/AuthModule';
import { AccessModule } from '../../security/AccessModule';
import { GroupModule } from '../group/GroupModule';

@Module({
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService, GrantService],
  exports: [UserService, RoleService, GrantService],
  imports: [ConfigurationModule, forwardRef(() => GroupModule), AccessModule, forwardRef(() => AuthModule)],
})
export class UserModule {}
