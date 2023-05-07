import { forwardRef, Module } from '@nestjs/common';
import { PollController } from './PollController';
import { PollService } from './PollService';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { AccessModule } from 'src/v2/security/AccessModule';
import { QuestionByIdPipe } from './pipe/QuestionByIdPipe';
import { DateService } from '../../utils/date/DateService';

@Module({
  controllers: [PollController],
  providers: [PollService, QuestionByIdPipe, DateService],
  exports: [PollService],
  imports: [forwardRef(() => DisciplineModule), AccessModule],
})
export class PollModule {}
