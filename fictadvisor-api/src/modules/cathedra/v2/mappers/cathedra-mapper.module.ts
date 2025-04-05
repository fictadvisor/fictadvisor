import { forwardRef, Module } from '@nestjs/common';
import { CathedraProfile } from './cathedra.profile';
import { TeacherMapperModule } from '../../../teacher/v2/mappers/teacher-mapper.module';

@Module({
  providers: [CathedraProfile],
  exports: [CathedraProfile],
  imports: [forwardRef(() => TeacherMapperModule)],
})
export class CathedraMapperModule {}
