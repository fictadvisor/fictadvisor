import { Module } from '@nestjs/common';
import { DateService } from './DateService';
import { PrismaService } from '../../database/PrismaService';

@Module({
  providers: [DateService, PrismaService],
  exports: [DateService],
})
export class DateModule {}