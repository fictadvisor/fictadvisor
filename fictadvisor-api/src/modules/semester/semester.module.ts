import { Module } from '@nestjs/common';
import { SemesterController } from './v2/semester.controller';
import { DateModule } from '../date/date.module';
import { AccessModule } from '../access/access.module';

@Module({
  controllers: [SemesterController],
  imports: [AccessModule, DateModule],
})
export class SemesterModule {}
