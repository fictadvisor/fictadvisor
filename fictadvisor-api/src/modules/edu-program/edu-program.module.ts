import { Module } from '@nestjs/common';
import { EduProgramController } from './v2/edu-program.controller';
import { EduProgramService } from './v2/edu-program.service';
import { EduProgramByIdPipe } from '../../common/pipes/edu-program-by-id.pipe';
import { EduProgramMapperModule } from './v2/mappers/edu-program-mapper.module';

@Module({
  controllers: [EduProgramController],
  providers: [EduProgramService, EduProgramByIdPipe],
  exports: [EduProgramService, EduProgramByIdPipe],
  imports: [EduProgramMapperModule],
})
export class EduProgramModule {}
