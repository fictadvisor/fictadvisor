import { ResourceResponse, ResourcesResponse } from '@fictadvisor/utils/responses';
import { Injectable } from '@nestjs/common';
import { DbStudentResource } from '../../database/v2/entities/DbStudentResource';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';

@Injectable()
export class ResourceMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbStudentResource, ResourceResponse);
    };
  }
  getResource (resource: DbStudentResource): ResourceResponse {
    return this.mapper.map(resource, DbStudentResource, ResourceResponse);
  }

  getResources (resources: DbStudentResource[]): ResourcesResponse {
    return {
      resources: this.mapper.mapArray(resources, DbStudentResource, ResourceResponse),
    };
  }
}
