import { Module } from '@nestjs/common';
import { EduProgramController } from './v2/edu-program.controller';
import { EduProgramService } from './v2/edu-program.service';
import { MapperModule } from '../../common/mappers/mapper.module';
import { EduProgramByIdPipe } from '../../common/pipes/edu-program-by-id.pipe';

@Module({
  controllers: [EduProgramController],
  providers: [EduProgramService, EduProgramByIdPipe],
  exports: [EduProgramService, EduProgramByIdPipe],
  imports: [MapperModule],
})
export class EduProgramModule {}
