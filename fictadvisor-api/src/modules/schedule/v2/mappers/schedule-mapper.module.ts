import { Module } from '@nestjs/common';
import { ScheduleProfile } from './schedule.profile';
import { TeacherMapperModule } from '../../../teacher/v2/mappers/teacher-mapper.module';

@Module({
  providers: [ScheduleProfile],
  exports: [ScheduleProfile],
  imports: [TeacherMapperModule],
})
export class ScheduleMapperModule {}
