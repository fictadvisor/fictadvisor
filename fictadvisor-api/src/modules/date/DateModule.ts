import { Module } from '@nestjs/common';
import { DateService } from './DateService';
import { DateController } from './DateController';
import { DateUtils } from './DateUtils';

@Module({
  controllers: [DateController],
  providers: [DateService, DateUtils],
  exports: [DateService, DateUtils],
})
export class DateModule {}
