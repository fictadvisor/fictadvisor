import { EduProgramRepository } from '../../database/repositories/EduProgramRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EduProgramService {
  constructor (
    private readonly eduProgramRepository: EduProgramRepository,
  ) {}

  getAll () {
    return this.eduProgramRepository.findMany();
  }
}