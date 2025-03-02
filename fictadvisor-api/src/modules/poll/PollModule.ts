import { Module } from '@nestjs/common';
import { PollController } from './v2/PollController';
import { PollService } from './v2/PollService';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { DateModule } from '../date/DateModule';

@Module({
  controllers: [PollController],
  providers: [PollService],
  exports: [PollService],
  imports: [AccessModule, MapperModule, DateModule],
})
export class PollModule {}
