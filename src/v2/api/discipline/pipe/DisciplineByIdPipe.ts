import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';
import { DisciplineRepository } from '../DisciplineRepository';

@Injectable()
export class DisciplineByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private disciplineRepository: DisciplineRepository
  ) {}

  async transform (disciplineId: string): Promise<string> {
    const discipline = await this.disciplineRepository.findById(disciplineId);
    if (!discipline) {
      throw new InvalidEntityIdException('discipline');
    }
    return disciplineId;
  }
}