import { Injectable } from '@nestjs/common';
import { SubjectResponse } from '@fictadvisor/utils/responses';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { DbSubject } from '../../../../database/v2/entities/subject.entity';

@Injectable()
export class SubjectProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile (): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DbSubject, SubjectResponse);
    };
  }
}
