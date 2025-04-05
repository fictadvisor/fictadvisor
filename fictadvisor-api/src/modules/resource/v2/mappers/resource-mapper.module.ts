import { Module } from '@nestjs/common';
import { ResourceProfile } from './resource.profile';

@Module({
  providers: [ResourceProfile],
  exports: [ResourceProfile],
})
export class ResourceMapperModule {}
