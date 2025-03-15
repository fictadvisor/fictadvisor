import { Module } from '@nestjs/common';
import { SpecialityService } from './v2/speciality.service';
import { SpecialityController } from './v2/speciality.controller';
import { MapperModule } from '../../common/mappers/mapper.module';

@Module({
  controllers: [SpecialityController],
  providers: [SpecialityService],
  exports: [SpecialityService],
  imports: [MapperModule],
}) 
export class SpecialityModule {}
