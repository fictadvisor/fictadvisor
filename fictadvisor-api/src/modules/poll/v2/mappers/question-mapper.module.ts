import { Module } from '@nestjs/common';
import { QuestionProfile } from './question.profile';
import { TeacherMapperModule } from '../../../teacher/v2/mappers/teacher-mapper.module';

@Module({
  providers: [QuestionProfile],
  exports: [QuestionProfile],
  imports: [TeacherMapperModule],
})
export class QuestionMapperModule {}
