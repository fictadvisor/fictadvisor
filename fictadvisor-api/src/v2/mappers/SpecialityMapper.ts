import { Injectable } from '@nestjs/common';
import { SpecialityResponse, SpecialityResponses } from '../api/responses/SpecialityResponse';
import { DbSpeciality } from '../../../../utils/types/DbSpeciality';

@Injectable()
export class SpecialityMapper {
  getAll (specialities: DbSpeciality[]): SpecialityResponses {
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