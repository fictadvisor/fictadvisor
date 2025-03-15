import { Module } from '@nestjs/common';
import { DateService } from './date.service';
import { DateController } from './date.controller';
import { DateUtils } from './date.util';

@Module({
  controllers: [DateController],
  providers: [DateService, DateUtils],
  exports: [DateService, DateUtils],
})
export class DateModule {}
