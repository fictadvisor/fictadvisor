import { Module } from '@nestjs/common';
import { EduProgramController } from '../api/controllers/EduProgramController';
import { EduProgramService } from '../api/services/EduProgramService';
import { EduProgramMapper } from '../mappers/EduProgramMapper';
import { EduProgramByIdPipe } from '../api/pipes/EduProgramByIdPipe';

@Module({
  controllers: [EduProgramController],
  providers: [EduProgramService, EduProgramMapper, EduProgramByIdPipe],
  exports: [EduProgramService, EduProgramByIdPipe],
})
export class EduProgramModule {}