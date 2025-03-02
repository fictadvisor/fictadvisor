import { Module } from '@nestjs/common';
import { SubjectService } from './v2/SubjectService';
import { SubjectController } from './v2/SubjectController';
import { PrismaModule } from '../../database/PrismaModule';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { GroupByIdPipe } from '../../common/pipes/GroupByIdPipe';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, GroupByIdPipe],
  exports: [SubjectService],
  imports: [PrismaModule, AccessModule, MapperModule, TeacherModule],
})
export class SubjectModule {}
