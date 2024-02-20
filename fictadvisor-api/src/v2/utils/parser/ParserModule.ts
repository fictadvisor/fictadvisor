import { Module } from '@nestjs/common';
import { CampusParser } from './CampusParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../modules/PrismaModule';
import { DateModule } from '../date/DateModule';
import { GeneralParser } from './GeneralParser';

@Module({
  providers: [CampusParser, RozParser, GeneralParser],
  exports: [CampusParser, RozParser, GeneralParser],
  imports: [PrismaModule, DateModule],
})
export class ParserModule {}