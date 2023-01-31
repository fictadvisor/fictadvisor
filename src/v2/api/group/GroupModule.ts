import { Module } from '@nestjs/common';
import { GroupController } from './GroupController';
import { GroupService } from './GroupService';
import { GroupByIdPipe } from './GroupByIdPipe';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { PrismaModule } from '../../database/PrismaModule';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupByIdPipe],
  exports: [GroupService, GroupByIdPipe],
  imports: [DisciplineModule, PrismaModule],
})
export class GroupModule {}