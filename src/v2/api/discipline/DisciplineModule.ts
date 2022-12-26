import { Module } from '@nestjs/common';
import { DisciplineController } from './DisciplineController';
import { DisciplineService } from './DisciplineService';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, PrismaService],
  exports: [DisciplineService],
})
export class DisciplineModule {}