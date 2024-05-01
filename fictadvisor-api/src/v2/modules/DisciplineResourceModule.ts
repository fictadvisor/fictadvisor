import { Module } from '@nestjs/common';
import { DisciplineResourceController } from '../api/controllers/DisciplineResourceController';
import { DisciplineResourceService } from '../api/services/DisciplineResourceService';
import { AccessModule } from './AccessModule';
import { TeacherByIdPipe } from '../api/pipes/TeacherByIdPipe';
import { SubjectByIdPipe } from '../api/pipes/SubjectByIdPipe';
import { ResourceCategoryByIdPipe } from '../api/pipes/ResourceCategoryByIdPipe';
import { MapperModule } from './MapperModule';
import { PrismaModule } from './PrismaModule';

@Module({
  controllers: [DisciplineResourceController],
  providers: [DisciplineResourceService, TeacherByIdPipe, SubjectByIdPipe, ResourceCategoryByIdPipe],
  exports: [DisciplineResourceService],
  imports: [AccessModule, MapperModule, PrismaModule],
})
export class DisciplineResourceModule {}