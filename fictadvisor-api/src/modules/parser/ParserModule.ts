import { forwardRef, Module } from '@nestjs/common';
import { CampusParser } from './CampusParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../database/PrismaModule';
import { DateModule } from '../date/DateModule';
import { GeneralParser } from './GeneralParser';
import { GroupModule } from '../group/GroupModule';
import { UserModule } from '../user/UserModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { ScheduleModule } from '../schedule/ScheduleModule';

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
