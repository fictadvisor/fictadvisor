import { forwardRef, Module } from '@nestjs/common';
import { DisciplineController } from '../api/controllers/DisciplineController';
import { DisciplineService } from '../api/services/DisciplineService';
import { TeacherModule } from './TeacherModule';
import { DisciplineTypeService } from '../api/services/DisciplineTypeService';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from 'src/v2/modules/AccessModule';
import { DisciplineMapper } from '../mappers/DisciplineMapper';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, DisciplineTypeService, DisciplineMapper],
  exports: [DisciplineService, DisciplineTypeService, DisciplineMapper],
  imports: [AccessModule, forwardRef(() => TeacherModule), PrismaModule],
})
export class DisciplineModule {}
