import { forwardRef, Module } from '@nestjs/common';
import { TeacherController } from './TeacherController';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { PollModule } from '../poll/PollModule';
import { DisciplineTeacherController } from './DisciplineTeacherController';
import { TeacherMapper } from './TeacherMapper';
import { DisciplineTeacherMapper } from './DisciplineTeacherMapper';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { AccessModule } from '../../security/AccessModule';
import { DateModule } from '../../utils/date/DateModule';
import { ConfigurationModule } from '../../config/ConfigModule';
import { SubjectByIdPipe } from '../subject/SubjectByIdPipe';

@Module({
  controllers: [TeacherController, DisciplineTeacherController],
  providers: [TeacherService, DisciplineTeacherService, TelegramAPI, SubjectByIdPipe, TeacherMapper, DisciplineTeacherMapper],
  exports: [TeacherService, DisciplineTeacherService, TeacherMapper, DisciplineTeacherMapper],
  imports: [forwardRef(() => PollModule), AccessModule, DateModule, ConfigurationModule],
})
export class TeacherModule {}

