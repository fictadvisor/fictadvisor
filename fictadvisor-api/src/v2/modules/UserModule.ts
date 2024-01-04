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
import { DateModule } from '../utils/date/DateModule';
import { TelegramAPI } from '../telegram/TelegramAPI';

@Module({
  controllers: [UserController, RoleController, GrantController],
  providers: [UserService, RoleService, GrantService, TelegramAPI],
  exports: [UserService, RoleService, GrantService],
  imports: [
    ConfigurationModule,
    forwardRef(() => GroupModule),
    AccessModule,
    forwardRef(() => AuthModule),
    MapperModule,
    FileModule,
    DateModule,
  ],
})
export class UserModule {}
