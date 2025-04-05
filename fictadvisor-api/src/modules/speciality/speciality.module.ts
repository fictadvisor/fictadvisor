import { Module } from '@nestjs/common';
import { SpecialityController } from './v2/speciality.controller';
import { SpecialityService } from './v2/speciality.service';
import { SpecialityMapperModule } from './v2/mappers/speciality-mapper.module';

@Module({
  controllers: [SpecialityController],
  providers: [SpecialityService],
  exports: [SpecialityService],
  imports: [SpecialityMapperModule],
})
export class SpecialityModule {}
