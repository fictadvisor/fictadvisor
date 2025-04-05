import { forwardRef, Module } from '@nestjs/common';
import { TeacherProfile } from './teacher.profile';
import { DisciplineTeacherProfile } from './discipline-teacher.profile';
import { CathedraMapperModule } from '../../../cathedra/v2/mappers/cathedra-mapper.module';
import { SubjectMapperModule } from '../../../subject/v2/mappers/subject-mapper.module';

@Module({
  providers: [TeacherProfile, DisciplineTeacherProfile],
  exports: [TeacherProfile, DisciplineTeacherProfile],
  imports: [forwardRef(() => CathedraMapperModule), SubjectMapperModule]
})
export class TeacherMapperModule {}
