import { Module } from '@nestjs/common';
import { DisciplineProfile } from './discipline.profile';
import { TeacherMapperModule } from '../../../teacher/v2/mappers/teacher-mapper.module';

@Module({
  providers: [DisciplineProfile],
  exports: [DisciplineProfile],
  imports: [TeacherMapperModule],
})
export class DisciplineMapperModule {}
