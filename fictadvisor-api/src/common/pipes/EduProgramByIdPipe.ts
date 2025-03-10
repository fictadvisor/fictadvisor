import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';
import { EduProgramRepository } from '../../database/v2/repositories/EduProgramRepository';

@Injectable()
export class EduProgramByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private eduProgramsRepository: EduProgramRepository,
  ) {}

  async transform (id: string): Promise<string> {
    const eduProgram = await this.eduProgramsRepository.findOne({ id });
    if (!eduProgram) {
      throw new InvalidEntityIdException('Educational program');
    }
    return id;
  }
}
