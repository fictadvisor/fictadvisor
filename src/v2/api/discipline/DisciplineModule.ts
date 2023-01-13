import { Module } from '@nestjs/common';
import { DisciplineController } from './DisciplineController';
import { DisciplineService } from './DisciplineService';
import { PrismaService } from '../../database/PrismaService';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { GroupModule } from '../group/GroupModule';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, PrismaService, GroupByDisciplineGuard],
  exports: [DisciplineService],
  imports: [GroupModule]
})
export class DisciplineModule {}