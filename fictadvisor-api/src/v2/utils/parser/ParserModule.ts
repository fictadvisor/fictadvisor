import { Module } from '@nestjs/common';
import { CampusParser } from './CampusParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../modules/PrismaModule';
import { DateModule } from '../date/DateModule';
import { GeneralParser } from './GeneralParser';
import { GroupModule } from '../../modules/GroupModule';
import { ScheduleService } from '../../api/services/ScheduleService';
import { UserModule } from '../../modules/UserModule';
import { MapperModule } from '../../modules/MapperModule';

@Module({
  providers: [CampusParser, RozParser, GeneralParser, ScheduleService],
  exports: [CampusParser, RozParser, GeneralParser],
  imports: [PrismaModule, DateModule, GroupModule, UserModule, MapperModule],
})
export class ParserModule {}
