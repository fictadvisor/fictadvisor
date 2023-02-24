import { forwardRef, Module } from '@nestjs/common';
import { PollController } from './PollController';
import { PollService } from './PollService';
import { GroupModule } from '../group/GroupModule';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { PrismaModule } from '../../database/PrismaModule';
import { QuestionByIdPipe } from './dto/QuestionByIdPipe';
import { UserModule } from '../user/UserModule';
import { AccessModule } from 'src/v2/security/AccessModule';

@Module({
  controllers: [PollController],
  providers: [PollService, QuestionByIdPipe],
  exports: [PollService],
  imports: [forwardRef(() => GroupModule), forwardRef(() => DisciplineModule), forwardRef(() => TeacherModule), PrismaModule, forwardRef(() => UserModule), forwardRef(() => DisciplineModule), AccessModule],
})
export class PollModule {}
