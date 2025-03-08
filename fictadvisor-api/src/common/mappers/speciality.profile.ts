import { Injectable } from '@nestjs/common';
import { SpecialityResponse } from '@fictadvisor/utils/responses';
import { DbSpeciality } from '../../database/v2/entities/speciality.entity';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';

@Injectable()
export class SpecialityProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbSpeciality, SpecialityResponse);
    };
  }
}
