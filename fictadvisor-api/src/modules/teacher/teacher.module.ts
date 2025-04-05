import { Module } from '@nestjs/common';
import { TeacherController } from './v2/teacher.controller';
import { TeacherService } from './v2/teacher.service';
import { DisciplineTeacherService } from './v2/discipline-teacher.service';
import { PollModule } from '../poll/poll.module';
import { DisciplineTeacherController } from './v2/discipline-teacher.controller';
import { AccessModule } from '../access/access.module';
import { DateModule } from '../date/date.module';
import { ConfigurationModule } from '../../config/config.module';
import { TelegramApiModule } from '../telegram-api/telegram-api.module';
import { GroupByIdPipe } from '../../common/pipes/group-by-id.pipe';
import { CathedraByIdPipe } from '../../common/pipes/cathedra-by-id.pipe';
import { TeacherByIdPipe } from '../../common/pipes/teacher-by-id.pipe';
import { TeacherMapperModule } from './v2/mappers/teacher-mapper.module';

@Module({
  controllers: [TeacherController, DisciplineTeacherController],
  providers: [
    TeacherService,
    DisciplineTeacherService,
    GroupByIdPipe,
    CathedraByIdPipe,
    TeacherByIdPipe,
  ],
  exports: [TeacherService, DisciplineTeacherService, TeacherByIdPipe],
  imports: [
    AccessModule,
    ConfigurationModule,
    TelegramApiModule,
    TeacherMapperModule,
    PollModule,
    DateModule,
  ],
})
export class TeacherModule {}

