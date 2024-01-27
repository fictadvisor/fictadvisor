import { Module } from '@nestjs/common';
import { EduProgramController } from '../api/controllers/EduProgramController';
import { EduProgramService } from '../api/services/EduProgramService';
import { EduProgramMapper } from '../mappers/EduProgramMapper';

@Module({
  controllers: [EduProgramController],
  providers: [EduProgramService, EduProgramMapper],
  exports: [EduProgramService],
})
export class EduProgramModule {}