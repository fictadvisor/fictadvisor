import { Module } from '@nestjs/common';
import { CampusParser } from './CampusParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../modules/PrismaModule';
import { DateModule } from '../date/DateModule';
import { GeneralParser } from './GeneralParser';
import { GroupModule } from '../../modules/GroupModule';

@Module({
  providers: [CampusParser, RozParser, GeneralParser],
  exports: [CampusParser, RozParser, GeneralParser],
  imports: [PrismaModule, DateModule, GroupModule],
})
export class ParserModule {}
