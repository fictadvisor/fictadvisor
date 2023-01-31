import { forwardRef, Module } from '@nestjs/common';
import { DisciplineController } from './DisciplineController';
import { DisciplineService } from './DisciplineService';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { TeacherModule } from '../teacher/TeacherModule';
import { DisciplineTypeService } from './DisciplineTypeService';
import { PrismaModule } from '../../database/PrismaModule';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, GroupByDisciplineGuard, DisciplineTypeService],
  exports: [DisciplineService, DisciplineTypeService],
  imports: [forwardRef(() => TeacherModule), PrismaModule],
})
export class DisciplineModule {}
