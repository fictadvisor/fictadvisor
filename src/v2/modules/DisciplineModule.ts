import { Module } from '@nestjs/common';
import { DisciplineController } from '../api/controllers/DisciplineController';
import { DisciplineService } from '../api/services/DisciplineService';
import { DisciplineTypeService } from '../api/services/DisciplineTypeService';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from 'src/v2/modules/AccessModule';
import { MapperModule } from './MapperModule';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, DisciplineTypeService],
  exports: [DisciplineService, DisciplineTypeService],
  imports: [AccessModule, PrismaModule, MapperModule],
})
export class DisciplineModule {}
