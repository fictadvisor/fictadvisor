import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { NotSelectiveException } from '../../utils/exceptions/NotSelectiveException';

@Injectable()
export class SelectiveDisciplinesPipe implements PipeTransform {
  constructor (
    private disciplineRepository: DisciplineRepository,
  ) {}

  async transform (body) {

    const selectiveDisciplinesIds = body.disciplines;

    if (selectiveDisciplinesIds.length === 0) {
      throw new InvalidEntityIdException('discipline');
    }

    selectiveDisciplinesIds.map(async (disciplineId) => {
      const discipline = await this.disciplineRepository.findById(disciplineId);
      if (!discipline) {
        throw new InvalidEntityIdException('discipline');
      }
      if (discipline.isSelective === false) {
        throw new NotSelectiveException();
      }
    });
    return body;
  }
}