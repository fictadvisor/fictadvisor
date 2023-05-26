import { Module } from '@nestjs/common';
import { TeacherController } from '../api/controllers/TeacherController';
import { TeacherService } from '../api/services/TeacherService';
import { DisciplineTeacherService } from '../api/services/DisciplineTeacherService';
import { PollModule } from './PollModule';
import { DisciplineTeacherController } from '../api/controllers/DisciplineTeacherController';
import { TelegramAPI } from '../telegram/TelegramAPI';
import { AccessModule } from './AccessModule';
import { DateModule } from '../utils/date/DateModule';
import { ConfigurationModule } from './ConfigModule';
import { SubjectByIdPipe } from '../api/pipes/SubjectByIdPipe';
import { MapperModule } from './MapperModule';

@Module({
  controllers: [TeacherController, DisciplineTeacherController],
  providers: [TeacherService, DisciplineTeacherService, TelegramAPI, SubjectByIdPipe],
  exports: [TeacherService, DisciplineTeacherService],
  imports: [PollModule, AccessModule, DateModule, ConfigurationModule, MapperModule],
})
export class TeacherModule {}

