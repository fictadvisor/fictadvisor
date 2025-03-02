import { Module } from '@nestjs/common';
import { EduProgramController } from './v2/EduProgramController';
import { EduProgramService } from './v2/EduProgramService';
import { MapperModule } from '../../common/mappers/MapperModule';
import { EduProgramByIdPipe } from '../../common/pipes/EduProgramByIdPipe';

@Module({
  controllers: [EduProgramController],
  providers: [EduProgramService, EduProgramByIdPipe],
  exports: [EduProgramService, EduProgramByIdPipe],
  imports: [MapperModule],
})
export class EduProgramModule {}
