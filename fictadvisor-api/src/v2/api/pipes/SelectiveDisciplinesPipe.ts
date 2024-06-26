import { Injectable, PipeTransform } from '@nestjs/common';
import { SelectiveDisciplinesDTO } from '@fictadvisor/utils/requests';
import { mapAsync } from '../../utils/ArrayUtil';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { NotSelectiveException } from '../../utils/exceptions/NotSelectiveException';

@Injectable()
export class SelectiveDisciplinesPipe implements PipeTransform {
  constructor (
    private disciplineRepository: DisciplineRepository,
  ) {}

  async transform (body: SelectiveDisciplinesDTO) {
    const selectiveDisciplinesIds = body.disciplines;

    if (selectiveDisciplinesIds.length === 0) {
      throw new InvalidEntityIdException('Discipline');
    }

    await mapAsync(selectiveDisciplinesIds, async (disciplineId: string) => {
      const discipline = await this.disciplineRepository.findById(disciplineId);
      if (!discipline) {
        throw new InvalidEntityIdException('Discipline');
      }
      if (discipline.isSelective === false) {
        throw new NotSelectiveException();
      }
    });
    return body;
  }
}