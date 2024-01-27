import { Module } from '@nestjs/common';
import { SpecialityService } from '../api/services/SpecialityService';
import { SpecialityController } from '../api/controllers/SpecialityController';
import { SpecialityMapper } from '../mappers/SpecialityMapper';

@Module({
  controllers: [SpecialityController],
  providers: [SpecialityService, SpecialityMapper],
  exports: [SpecialityModule],
}) 
export class SpecialityModule {}