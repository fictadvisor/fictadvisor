import { Module } from '@nestjs/common';
import { SpecialityService } from './v2/SpecialityService';
import { SpecialityController } from './v2/SpecialityController';
import { MapperModule } from '../../common/mappers/MapperModule';

@Module({
  controllers: [SpecialityController],
  providers: [SpecialityService],
  exports: [SpecialityService],
  imports: [MapperModule],
}) 
export class SpecialityModule {}
