import { Module } from '@nestjs/common';
import { EduProgramProfile } from './edu-program.profile';

@Module({
  providers: [EduProgramProfile],
  exports: [EduProgramProfile],
})
export class EduProgramMapperModule {}
