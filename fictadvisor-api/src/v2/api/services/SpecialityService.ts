import { Injectable } from '@nestjs/common';
import { SpecialityRepository } from '../../database/repositories/SpecialityRepository';

@Injectable()
export class SpecialityService {
  constructor (
    private readonly specialityRepository: SpecialityRepository,
  ) {}
  
  getAll () {
    return this.specialityRepository.findMany();
  }
}