import { forwardRef, Module } from '@nestjs/common';
import { ScheduleController } from './v2/schedule.controller';
import { ScheduleService } from './v2/schedule.service';
import { ParserModule } from '../parser/parser.module';
import { GroupModule } from '../group/group.module';
import { DateModule } from '../date/date.module';
import { DisciplineModule } from '../discipline/discipline.module';
import { TeacherModule } from '../teacher/teacher.module';
import { PrismaModule } from '../../database/prisma.module';
import { AccessModule } from '../access/access.module';
import { MapperModule } from '../../common/mappers/mapper.module';
import { UserModule } from '../user/user.module';
import { ConfigurationModule } from '../../config/config.module';

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
