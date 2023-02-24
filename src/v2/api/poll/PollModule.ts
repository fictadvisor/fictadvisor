import { forwardRef, Module } from '@nestjs/common';
import { PollController } from './PollController';
import { PollService } from './PollService';
import { GroupModule } from '../group/GroupModule';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { QuestionByIdPipe } from './pipe/QuestionByIdPipe';

@Module({
  controllers: [PollController],
  providers: [PollService, QuestionByIdPipe],
  exports: [PollService],
  imports: [forwardRef(() => GroupModule), forwardRef(() => DisciplineModule), forwardRef(() => TeacherModule), PrismaModule, forwardRef(() => UserModule), forwardRef(() => DisciplineModule), AccessModule],
})
export class PollModule {}
