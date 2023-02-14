import { forwardRef, Module } from '@nestjs/common';
import { DisciplineController } from './DisciplineController';
import { DisciplineService } from './DisciplineService';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { TeacherModule } from '../teacher/TeacherModule';
import { DisciplineTypeService } from './DisciplineTypeService';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from "../user/UserModule";

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, GroupByDisciplineGuard, DisciplineTypeService],
  exports: [DisciplineService, DisciplineTypeService],
  imports: [forwardRef(() => TeacherModule), PrismaModule, UserModule],
})
export class DisciplineModule {}