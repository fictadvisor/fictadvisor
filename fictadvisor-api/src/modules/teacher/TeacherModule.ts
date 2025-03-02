import { Module } from '@nestjs/common';
import { TeacherController } from './v2/TeacherController';
import { TeacherService } from './v2/TeacherService';
import { DisciplineTeacherService } from './v2/DisciplineTeacherService';
import { PollModule } from '../poll/PollModule';
import { DisciplineTeacherController } from './v2/DisciplineTeacherController';
import { AccessModule } from '../access/AccessModule';
import { DateModule } from '../date/DateModule';
import { ConfigurationModule } from '../../config/ConfigModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { TelegramApiModule } from '../telegram-api/TelegramApiModule';
import { GroupByIdPipe } from '../../common/pipes/GroupByIdPipe';
import { CathedraByIdPipe } from '../../common/pipes/CathedraByIdPipe';
import { TeacherByIdPipe } from '../../common/pipes/TeacherByIdPipe';

@Module({
  controllers: [TeacherController, DisciplineTeacherController],
  providers: [TeacherService, DisciplineTeacherService, GroupByIdPipe, CathedraByIdPipe, TeacherByIdPipe],
  exports: [TeacherService, DisciplineTeacherService, TeacherByIdPipe],
  imports: [PollModule, AccessModule, DateModule, ConfigurationModule, TelegramApiModule, MapperModule],
})
export class TeacherModule {}

