import { Module } from '@nestjs/common';
import { DisciplineController } from '../api/controllers/DisciplineController';
import { DisciplineService } from '../api/services/DisciplineService';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from 'src/v2/modules/AccessModule';
import { MapperModule } from './MapperModule';
import { QueryAllDisciplinesPipe } from '../api/pipes/QueryAllDisciplinesPipe';
import { TeacherModule } from './TeacherModule';
import { GroupModule } from './GroupModule';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, QueryAllDisciplinesPipe],
  exports: [DisciplineService, QueryAllDisciplinesPipe],
  imports: [AccessModule, PrismaModule, MapperModule, TeacherModule, GroupModule],
})
export class DisciplineModule {}
