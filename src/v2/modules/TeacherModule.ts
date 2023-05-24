import { forwardRef, Module } from '@nestjs/common';
import { TeacherController } from '../api/controllers/TeacherController';
import { TeacherService } from '../api/services/TeacherService';
import { DisciplineTeacherService } from '../api/services/DisciplineTeacherService';
import { PollModule } from './PollModule';
import { DisciplineTeacherController } from '../api/controllers/DisciplineTeacherController';
import { TeacherMapper } from '../mappers/TeacherMapper';
import { DisciplineTeacherMapper } from '../mappers/DisciplineTeacherMapper';
import { TelegramAPI } from '../telegram/TelegramAPI';
import { AccessModule } from './AccessModule';
import { DateModule } from '../utils/date/DateModule';
import { ConfigurationModule } from './ConfigModule';
import { SubjectByIdPipe } from '../api/pipes/SubjectByIdPipe';

@Module({
  controllers: [TeacherController, DisciplineTeacherController],
  providers: [TeacherService, DisciplineTeacherService, TelegramAPI, SubjectByIdPipe, TeacherMapper, DisciplineTeacherMapper],
  exports: [TeacherService, DisciplineTeacherService, TeacherMapper, DisciplineTeacherMapper],
  imports: [forwardRef(() => PollModule), AccessModule, DateModule, ConfigurationModule],
})
export class TeacherModule {}

