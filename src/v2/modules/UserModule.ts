import { forwardRef, Module } from '@nestjs/common';
import { UserService } from '../api/services/UserService';
import { UserController } from '../api/controllers/UserController';
import { ConfigurationModule } from './ConfigModule';
import { RoleService } from '../api/services/RoleService';
import { RoleController } from '../api/controllers/RoleController';
import { GrantService } from '../api/services/GrantService';
import { AuthModule } from './AuthModule';
import { AccessModule } from './AccessModule';
import { GroupModule } from './GroupModule';
import { UserMapper } from '../mappers/UserMapper';
import { RoleMapper } from '../mappers/RoleMapper';
import { GrantController } from '../api/controllers/GrantController';
import { GrantMapper } from '../mappers/GrantMapper';
import { StudentMapper } from '../mappers/StudentMapper';
@Module({
  controllers: [UserController, RoleController, GrantController],
  providers: [UserService, RoleService, GrantService, UserMapper, StudentMapper, RoleMapper, GrantMapper],
  exports: [UserService, RoleService, GrantService, UserMapper, StudentMapper, RoleMapper, GrantMapper],
  imports: [ConfigurationModule, forwardRef(() => GroupModule), forwardRef(() => AccessModule), forwardRef(() => AuthModule)],
})
export class UserModule {}
