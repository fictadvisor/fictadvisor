import { Module } from '@nestjs/common';
import { SubjectService } from '../api/services/SubjectService';
import { SubjectController } from '../api/controllers/SubjectController';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';
import { TeacherModule } from './TeacherModule';

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
  imports: [PrismaModule, AccessModule, MapperModule, TeacherModule],
})
export class SubjectModule {}