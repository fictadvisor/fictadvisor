import { Module } from '@nestjs/common';
import { SubjectProfile } from './subject.profile';

@Module({
  providers: [SubjectProfile],
  exports: [SubjectProfile],
})
export class SubjectMapperModule {}
