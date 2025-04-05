import { Module } from '@nestjs/common';
import { GroupProfile } from './group.profile';
import { StudentMapperModule } from '../../../student/v2/mappers/student-mapper.module';
import { SpecialityMapperModule } from '../../../speciality/v2/mappers/speciality-mapper.module';

@Module({
  providers: [GroupProfile],
  exports: [GroupProfile],
  imports: [StudentMapperModule, SpecialityMapperModule],
})
export class GroupMapperModule {}
