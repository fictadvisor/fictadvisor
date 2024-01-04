import { Module } from '@nestjs/common';
import { PollController } from '../api/controllers/PollController';
import { PollService } from '../api/services/PollService';
import { AccessModule } from 'src/v2/modules/AccessModule';
import { QuestionByIdPipe } from '../api/pipes/QuestionByIdPipe';
import { QuestionByRoleAndIdPipe } from '../api/pipes/QuestionByRoleAndIdPipe';
import { DateService } from '../utils/date/DateService';
import { MapperModule } from './MapperModule';

@Module({
  controllers: [PollController],
  providers: [PollService, QuestionByIdPipe, QuestionByRoleAndIdPipe, DateService],
  exports: [PollService],
  imports: [AccessModule, MapperModule],
})
export class PollModule {}
