import { Injectable } from '@nestjs/common';
import { EduProgramRepository } from '../../../database/v2/repositories/edu-program.repository';

@Injectable()
export class EduProgramService {
  constructor (
    private readonly eduProgramRepository: EduProgramRepository,
  ) {}

  getAll () {
    return this.eduProgramRepository.findMany();
  }
}
