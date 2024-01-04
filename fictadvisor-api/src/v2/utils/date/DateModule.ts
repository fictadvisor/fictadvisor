import { Module } from '@nestjs/common';
import { DateService } from './DateService';
import { DateController } from '../../api/controllers/DateController';

@Module({
  controllers: [DateController],
  providers: [DateService],
  exports: [DateService],
})
export class DateModule {}
