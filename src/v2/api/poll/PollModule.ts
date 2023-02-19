import { forwardRef, Module } from '@nestjs/common';
import { PollController } from './PollController';
import { PollService } from './PollService';
import { GroupByDisciplineTeacherGuard } from '../../security/group-guard/GroupByDisciplineTeacherGuard';
import { GroupModule } from '../group/GroupModule';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { PrismaModule } from '../../database/PrismaModule';
import { QuestionByIdPipe } from './dto/QuestionByIdPipe';
import { UserModule } from '../user/UserModule';

@Module({
  controllers: [PollController],
  providers: [PollService, GroupByDisciplineTeacherGuard, QuestionByIdPipe],
  exports: [PollService],
  imports: [forwardRef(() => GroupModule), forwardRef(() => DisciplineModule), forwardRef(() => TeacherModule), PrismaModule, UserModule],
})
export class PollModule {}
