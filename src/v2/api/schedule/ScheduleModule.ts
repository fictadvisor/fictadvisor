import { Module } from '@nestjs/common';
import { ScheduleController } from './ScheduleController';
import { ScheduleService } from './ScheduleService';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
  exports: [ScheduleService],
})
export class ScheduleModule {}