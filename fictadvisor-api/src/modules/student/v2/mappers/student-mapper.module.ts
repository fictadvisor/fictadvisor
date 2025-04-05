import { Module } from '@nestjs/common';
import { StudentProfile } from './student.profile';

@Module({
  providers: [StudentProfile],
  exports: [StudentProfile],
})
export class StudentMapperModule {}
