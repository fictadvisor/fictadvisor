import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { EduProgramRepository } from '../../database/repositories/EduProgramRepository';

@Injectable()
export class EduProgramByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private eduProgramsRepository: EduProgramRepository,
  ) {}

  async transform (eduProgramId: string): Promise<string> {
    const eduProgram = await this.eduProgramsRepository.findById(eduProgramId);
    if (!eduProgram) {
      throw new InvalidEntityIdException('Educational program');
    }
    return eduProgramId;
  }
}
