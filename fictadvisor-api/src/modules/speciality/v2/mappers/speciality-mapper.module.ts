import { Module } from '@nestjs/common';
import { SpecialityProfile } from './speciality.profile';

@Module({
  providers: [SpecialityProfile],
  exports: [SpecialityProfile],
})
export class SpecialityMapperModule {}
