import { Injectable, PipeTransform } from '@nestjs/common';
import { DisciplineRepository } from '../../database/v2/repositories/discipline.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

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
