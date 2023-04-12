import { Module } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { SubjectController } from './SubjectController';
import { PrismaModule } from '../../database/PrismaModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { AccessModule } from '../../security/AccessModule';
import { SubjectMapper } from './SubjectMapper';

@Module({
  providers: [SubjectService, SubjectMapper],
  controllers: [SubjectController],
  exports: [SubjectService, SubjectMapper],
  imports: [PrismaModule, TeacherModule, AccessModule],
})
export class SubjectModule {}