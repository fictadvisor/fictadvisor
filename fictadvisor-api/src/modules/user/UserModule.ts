import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './v2/UserService';
import { UserController } from './v2/UserController';
import { ConfigurationModule } from '../../config/ConfigModule';
import { RoleService } from './v2/RoleService';
import { RoleController } from './v2/RoleController';
import { AuthModule } from '../auth/AuthModule';
import { AccessModule } from '../access/AccessModule';
import { GroupModule } from '../group/GroupModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { FileModule } from '../file/FileModule';
import { DateModule } from '../date/DateModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { PollModule } from '../poll/PollModule';
import { TelegramApiModule } from '../telegram-api/TelegramApiModule';

@Module({
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
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
    TelegramApiModule,
  ],
})
export class UserModule {}
