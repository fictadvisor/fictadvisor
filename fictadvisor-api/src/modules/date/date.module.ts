import { Module } from '@nestjs/common';
import { DateService } from './v2/date.service';
import { DateController } from './v2/date.controller';
import { DateUtils } from './date.utils';

@Module({
  controllers: [DateController],
  providers: [DateService, DateUtils],
  exports: [DateService, DateUtils],
})
export class DateModule {}
