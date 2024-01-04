import { Module } from '@nestjs/common';
import { ScheduleController } from '../api/controllers/ScheduleController';
import { ScheduleService } from '../api/services/ScheduleService';
import { ParserModule } from '../utils/parser/ParserModule';
import { GroupModule } from './GroupModule';
import { DateModule } from '../utils/date/DateModule';
import { DisciplineModule } from './DisciplineModule';
import { TeacherModule } from './TeacherModule';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from 'src/v2/modules/AccessModule';
import { MapperModule } from './MapperModule';
import { UserModule } from './UserModule';
import { TelegramConfigService } from '../config/TelegramConfigService';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, TelegramConfigService],
  exports: [ScheduleService, TelegramConfigService],
  imports: [
    ParserModule,
    GroupModule,
    DateModule,
    DisciplineModule,
    TeacherModule,
    PrismaModule,
    AccessModule,
    MapperModule,
    UserModule,
  ],
})
export class ScheduleModule {}
