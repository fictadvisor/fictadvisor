import { Injectable } from '@nestjs/common';
import { SpecialityResponse, SpecialitiesResponse } from '@fictadvisor/utils/responses';
import { DbSpeciality } from '../database/entities/DbSpeciality';

@Injectable()
export class SpecialityMapper {
  getAll (specialities: DbSpeciality[]): SpecialitiesResponse {
    return {
      specialities: specialities.map((speciality) => this.get(speciality)),
    };
  }

  get (speciality: DbSpeciality): SpecialityResponse {
    return {
      id: speciality.id,
      code: speciality.code,
      abbreviation: speciality.abbreviation,
      name: speciality.name,
    };
  }
}