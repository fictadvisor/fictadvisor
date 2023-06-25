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
import { GrantController } from '../api/controllers/GrantController';
import { MapperModule } from './MapperModule';
import { FileModule } from '../utils/files/FileModule';
import { DateService } from '../utils/date/DateService';

@Module({
  controllers: [UserController, RoleController, GrantController],
  providers: [UserService, RoleService, GrantService, DateService],
  exports: [UserService, RoleService, GrantService],
  imports: [ConfigurationModule, forwardRef(() => GroupModule), AccessModule, forwardRef(() => AuthModule), MapperModule, FileModule],
})
export class UserModule {}
