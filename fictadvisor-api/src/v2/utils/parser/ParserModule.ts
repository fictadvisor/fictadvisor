import { Module } from '@nestjs/common';
import { CampusParser } from './CampusParser';
import { RozParser } from './RozParser';
import { PrismaModule } from '../../modules/PrismaModule';
import { DateModule } from '../date/DateModule';

@Module({
  providers: [CampusParser, RozParser],
  exports: [CampusParser, RozParser],
  imports: [PrismaModule, DateModule],
})
export class ParserModule {}