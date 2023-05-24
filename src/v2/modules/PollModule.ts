import { forwardRef, Module } from '@nestjs/common';
import { PollController } from '../api/controllers/PollController';
import { PollService } from '../api/services/PollService';
import { DisciplineModule } from './DisciplineModule';
import { AccessModule } from 'src/v2/modules/AccessModule';
import { QuestionByIdPipe } from '../api/pipes/QuestionByIdPipe';
import { QuestionMapper } from '../mappers/QuestionMapper';
import { QuestionByRoleAndIdPipe } from '../api/pipes/QuestionByRoleAndIdPipe';
import { DateService } from '../utils/date/DateService';

@Module({
  controllers: [PollController],
  providers: [PollService, QuestionMapper, QuestionByIdPipe, QuestionByRoleAndIdPipe, DateService],
  exports: [PollService, QuestionMapper],
  imports: [forwardRef(() => DisciplineModule), AccessModule],
})
export class PollModule {}
