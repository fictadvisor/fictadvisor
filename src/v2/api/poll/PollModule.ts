import { forwardRef, Module } from '@nestjs/common';
import { PollController } from './PollController';
import { PollService } from './PollService';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { AccessModule } from 'src/v2/security/AccessModule';
import { QuestionByIdPipe } from './pipe/QuestionByIdPipe';
import { QuestionMapper } from './QuestionMapper';
import { QuestionByRoleAndIdPipe } from './pipe/QuestionByRoleAndIdPipe';
import { DateService } from '../../utils/date/DateService';

@Module({
  controllers: [PollController],
  providers: [PollService, QuestionMapper, QuestionByIdPipe, QuestionByRoleAndIdPipe, DateService],
  exports: [PollService, QuestionMapper],
  imports: [forwardRef(() => DisciplineModule), AccessModule],
})
export class PollModule {}
