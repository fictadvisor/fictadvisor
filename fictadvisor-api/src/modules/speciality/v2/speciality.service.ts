import { Injectable } from '@nestjs/common';
import { SpecialityRepository } from '../../../database/v2/repositories/speciality.repository';

@Injectable()
export class SpecialityService {
  constructor (
    private readonly specialityRepository: SpecialityRepository,
  ) {}

  getAll () {
    return this.specialityRepository.findMany({});
  }
}
