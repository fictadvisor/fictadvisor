import { forwardRef, Module } from '@nestjs/common';
import { UserService } from '../api/services/UserService';
import { UserController } from '../api/controllers/UserController';
import { ConfigurationModule } from './ConfigModule';
import { RoleService } from '../api/services/RoleService';
import { RoleController } from '../api/controllers/RoleController';
import { AuthModule } from './AuthModule';
import { AccessModule } from './AccessModule';
import { GroupModule } from './GroupModule';
import { MapperModule } from './MapperModule';
import { FileModule } from '../utils/files/FileModule';
import { DateModule } from '../utils/date/DateModule';
import { TelegramAPI } from '../telegram/TelegramAPI';
import { TeacherModule } from './TeacherModule';
import { PollModule } from './PollModule';

@Module({
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService, TelegramAPI],
  exports: [UserService, RoleService],
  imports: [
    ConfigurationModule,
    forwardRef(() => GroupModule),
    AccessModule,
    forwardRef(() => AuthModule),
    MapperModule,
    FileModule,
    DateModule,
    TeacherModule,
    PollModule,
  ],
})
export class UserModule {}
