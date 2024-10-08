import { Injectable, PipeTransform } from '@nestjs/common';
import { DisciplineResourceRepository } from '../../database/repositories/DisciplineResourceRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class DisciplineResourceByIdPipe implements PipeTransform {

  constructor (
    private disciplineResourceRepository: DisciplineResourceRepository,
  ) {}

  async transform (resourceId: string) {
    const resource = await this.disciplineResourceRepository.findById(resourceId);
    if (!resource) {
      throw new InvalidEntityIdException('Resource');
    }
    return resourceId;
  }
}