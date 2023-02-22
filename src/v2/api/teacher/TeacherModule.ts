import { forwardRef, Module } from '@nestjs/common';
import { TeacherController } from './TeacherController';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { PollModule } from '../poll/PollModule';
import { DateService } from '../../utils/date/DateService';
import { DisciplineTeacherController } from './DisciplineTeacherController';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { TelegramConfigService } from '../../config/TelegramConfigService';

@Module({
  controllers: [TeacherController, DisciplineTeacherController],
  providers: [TeacherService, DisciplineTeacherService, DateService, TelegramAPI, TelegramConfigService],
  exports: [TeacherService, DisciplineTeacherService],
  imports: [forwardRef(() => DisciplineModule), PrismaModule, forwardRef(() => UserModule), forwardRef(() => PollModule)],
})
export class TeacherModule {}