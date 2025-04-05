import { Module } from '@nestjs/common';
import { SubjectController } from './v2/subject.controller';
import { SubjectService } from './v2/subject.service';
import { PrismaModule } from '../../database/prisma.module';
import { AccessModule } from '../access/access.module';
import { TeacherModule } from '../teacher/teacher.module';
import { GroupByIdPipe } from '../../common/pipes/group-by-id.pipe';
import { SubjectMapperModule } from './v2/mappers/subject-mapper.module';
import { TeacherMapperModule } from '../teacher/v2/mappers/teacher-mapper.module';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, GroupByIdPipe],
  exports: [SubjectService],
  imports: [PrismaModule, AccessModule, TeacherModule, SubjectMapperModule, TeacherMapperModule],
})
export class SubjectModule {}
