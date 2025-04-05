import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './v2/user.controller';
import { UserService } from './v2/user.service';
import { RoleController } from './v2/role.controller';
import { RoleService } from './v2/role.service';
import { ConfigurationModule } from '../../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { AccessModule } from '../access/access.module';
import { GroupModule } from '../group/group.module';
import { FileModule } from '../file/file.module';
import { DateModule } from '../date/date.module';
import { TeacherModule } from '../teacher/teacher.module';
import { PollModule } from '../poll/poll.module';
import { TelegramApiModule } from '../telegram-api/telegram-api.module';
import { UserMapperModule } from './v2/mappers/user-mapper.module';
import { StudentMapperModule } from '../student/v2/mappers/student-mapper.module';
import { DisciplineMapperModule } from '../discipline/v2/mappers/discipline-mapper.module';

@Module({
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService],
  imports: [
    ConfigurationModule,
    forwardRef(() => GroupModule),
    AccessModule,
    forwardRef(() => AuthModule),
    FileModule,
    DateModule,
    TeacherModule,
    PollModule,
    TelegramApiModule,
    UserMapperModule,
    StudentMapperModule,
    DisciplineMapperModule,
  ],
})
export class UserModule {}
