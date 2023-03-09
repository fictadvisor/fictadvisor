import { Module } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { SubjectController } from './SubjectController';
import { PrismaModule } from '../../database/PrismaModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { AccessModule } from '../../security/AccessModule';

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
  imports: [PrismaModule, TeacherModule, AccessModule],
})
export class SubjectModule {}