import { Module } from '@nestjs/common';
import { SubjectService } from '../api/services/SubjectService';
import { SubjectController } from '../api/controllers/SubjectController';
import { PrismaModule } from './PrismaModule';
import { TeacherModule } from './TeacherModule';
import { AccessModule } from './AccessModule';
import { SubjectMapper } from '../mappers/SubjectMapper';

@Module({
  providers: [SubjectService, SubjectMapper],
  controllers: [SubjectController],
  exports: [SubjectService, SubjectMapper],
  imports: [PrismaModule, TeacherModule, AccessModule],
})
export class SubjectModule {}