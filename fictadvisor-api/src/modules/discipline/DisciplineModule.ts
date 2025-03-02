import { Module } from '@nestjs/common';
import { DisciplineController } from './v2/DisciplineController';
import { DisciplineService } from './v2/DisciplineService';
import { PrismaModule } from '../../database/PrismaModule';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { TeacherModule } from '../teacher/TeacherModule';
import { GroupModule } from '../group/GroupModule';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService],
  exports: [DisciplineService],
  imports: [AccessModule, PrismaModule, MapperModule, TeacherModule, GroupModule],
})
export class DisciplineModule {}
