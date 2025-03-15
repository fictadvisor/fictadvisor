import { Module } from '@nestjs/common';
import { SubjectService } from './v2/subject.service';
import { SubjectController } from './v2/subject.controller';
import { PrismaModule } from '../../database/prisma.module';
import { AccessModule } from '../access/access.module';
import { MapperModule } from '../../common/mappers/mapper.module';
import { TeacherModule } from '../teacher/teacher.module';
import { GroupByIdPipe } from '../../common/pipes/group-by-id.pipe';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, GroupByIdPipe],
  exports: [SubjectService],
  imports: [PrismaModule, AccessModule, MapperModule, TeacherModule],
})
export class SubjectModule {}
