import { Injectable, PipeTransform } from '@nestjs/common';
import { SelectiveDisciplinesDTO } from '@fictadvisor/utils/requests';
import { mapAsync } from '../utils/array.utils';
import { DisciplineRepository } from '../../database/v2/repositories/discipline.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { NotSelectiveException } from '../exceptions/not-selective.exception';

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

    await mapAsync(selectiveDisciplinesIds, async (id: string) => {
      const discipline = await this.disciplineRepository.findOne({ id });
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
