import { Module } from '@nestjs/common';
import { DateService } from './DateService';

@Module({
  providers: [DateService],
  exports: [DateService],
})
export class DateModule {}