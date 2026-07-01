import { Injectable, PipeTransform } from '@nestjs/common';
import { DisciplineRepository } from '../../database/v2/repositories/discipline.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class DisciplineByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private disciplineRepository: DisciplineRepository,
  ) {}

  async transform (id: string): Promise<string> {
    const exists = await this.disciplineRepository.exists({ id });
    if (!exists) {
      throw new InvalidEntityIdException('Discipline');
    }
    return id;
  }
}
