import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './v2/user.service';
import { UserController } from './v2/user.controller';
import { ConfigurationModule } from '../../config/config.module';
import { RoleService } from './v2/role.service';
import { RoleController } from './v2/role.controller';
import { AuthModule } from '../auth/auth.module';
import { AccessModule } from '../access/access.module';
import { GroupModule } from '../group/group.module';
import { MapperModule } from '../../common/mappers/mapper.module';
import { FileModule } from '../file/file.module';
import { DateModule } from '../date/date.module';
import { TeacherModule } from '../teacher/teacher.module';
import { PollModule } from '../poll/poll.module';
import { TelegramApiModule } from '../telegram-api/telegram-api.module';

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
