import { Injectable } from '@nestjs/common';
import { SpecialityResponse, SpecialitiesResponse } from '@fictadvisor/utils/responses';
import { DbSpeciality } from '../../database/v2/entities/DbSpeciality';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';

@Injectable()
export class SpecialityMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbSpeciality, SpecialitiesResponse);
    };
  }

  getAll (specialities: DbSpeciality[]): SpecialitiesResponse {
    return {
      specialities: this.mapper.mapArray(specialities, DbSpeciality, SpecialityResponse),
    };
  }

  get (speciality: DbSpeciality): SpecialityResponse {
    return this.mapper.map(speciality, DbSpeciality, SpecialityResponse);
  }
}
