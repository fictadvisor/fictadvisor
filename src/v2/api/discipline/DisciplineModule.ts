import { forwardRef, Module } from '@nestjs/common';
import { DisciplineController } from './DisciplineController';
import { DisciplineService } from './DisciplineService';
import { TeacherModule } from '../teacher/TeacherModule';
import { DisciplineTypeService } from './DisciplineTypeService';
import { PrismaModule } from '../../database/PrismaModule';
import { AccessModule } from 'src/v2/security/AccessModule';
import { DisciplineMapper } from './DisciplineMapper';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, DisciplineTypeService, DisciplineMapper],
  exports: [DisciplineService, DisciplineTypeService, DisciplineMapper],
  imports: [AccessModule, forwardRef(() => TeacherModule), PrismaModule],
})
export class DisciplineModule {}
