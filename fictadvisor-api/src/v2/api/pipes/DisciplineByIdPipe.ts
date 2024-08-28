import { Injectable, PipeTransform } from '@nestjs/common';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';

@Injectable()
export class DisciplineByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private disciplineRepository: DisciplineRepository
  ) {}

  async transform (disciplineId: string): Promise<string> {
    const discipline = await this.disciplineRepository.findById(disciplineId);
    if (!discipline) {
      throw new InvalidEntityIdException('Discipline');
    }
    return disciplineId;
  }
}
