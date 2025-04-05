import { Module } from '@nestjs/common';
import { PollController } from './v2/poll.controller';
import { PollService } from './v2/poll.service';
import { QuestionProfile } from './v2/mappers/question.profile';
import { AccessModule } from '../access/access.module';
import { DateModule } from '../date/date.module';
import { QuestionMapperModule } from './v2/mappers/question-mapper.module';

@Module({
  controllers: [PollController],
  providers: [PollService],
  exports: [PollService],
  imports: [AccessModule, DateModule, QuestionMapperModule],
})
export class PollModule {}
