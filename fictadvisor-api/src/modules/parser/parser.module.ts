import { forwardRef, Module } from '@nestjs/common';
import { CampusParser } from './v2/campus-parser';
import { RozParser } from './v2/roz-parser';
import { PrismaModule } from '../../database/prisma.module';
import { DateModule } from '../date/date.module';
import { GeneralParser } from './v2/general-parser';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';
import { MapperModule } from '../../common/mappers/mapper.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  providers: [CampusParser, RozParser, GeneralParser],
  exports: [CampusParser, RozParser, GeneralParser],
  imports: [
    PrismaModule,
    DateModule,
    GroupModule,
    UserModule,
    MapperModule,
    forwardRef(() => ScheduleModule),
  ],
})
export class ParserModule {}
