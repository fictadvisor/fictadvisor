import { ResourceResponse } from '@fictadvisor/utils/responses';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { DbStudentResource } from '../../database/v2/entities/student-resource.entity';

@Injectable()
export class ResourceProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbStudentResource, ResourceResponse);
    };
  }
}
