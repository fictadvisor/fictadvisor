import { Module } from '@nestjs/common';
import { PollController } from './v2/poll.controller';
import { PollService } from './v2/poll.service';
import { AccessModule } from '../access/access.module';
import { MapperModule } from '../../common/mappers/mapper.module';
import { DateModule } from '../date/date.module';

@Module({
  controllers: [PollController],
  providers: [PollService],
  exports: [PollService],
  imports: [AccessModule, MapperModule, DateModule],
})
export class PollModule {}
