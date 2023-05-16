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
import { UserMapper } from './UserMapper';
import { RoleMapper } from './role/RoleMapper';
import { GrantController } from './grant/GrantController';
import { GrantMapper } from './grant/GrantMapper';
import { StudentMapper } from './StudentMapper';
@Module({
  controllers: [UserController, RoleController, GrantController],
  providers: [UserService, RoleService, GrantService, UserMapper, StudentMapper, RoleMapper, GrantMapper],
  exports: [UserService, RoleService, GrantService, UserMapper, StudentMapper, RoleMapper, GrantMapper],
  imports: [ConfigurationModule, forwardRef(() => GroupModule), forwardRef(() => AccessModule), forwardRef(() => AuthModule)],
})
export class UserModule {}