import { forwardRef, Module } from '@nestjs/common';
import { ScheduleController } from './v2/ScheduleController';
import { ScheduleService } from './v2/ScheduleService';
import { ParserModule } from '../parser/ParserModule';
import { GroupModule } from '../group/GroupModule';
import { DateModule } from '../date/DateModule';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { PrismaModule } from '../../database/PrismaModule';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { UserModule } from '../user/UserModule';
import { ConfigurationModule } from '../../config/ConfigModule';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
  imports: [
    GroupModule,
    DateModule,
    DisciplineModule,
    TeacherModule,
    PrismaModule,
    AccessModule,
    MapperModule,
    UserModule,
    ConfigurationModule,
    forwardRef(() => ParserModule),
  ],
})
export class ScheduleModule {}
