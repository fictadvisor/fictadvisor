import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateResourcesDTO } from '@fictadvisor/utils/requests';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { ResourceRepository } from '../../database/v2/repositories/resource.repository';

@Injectable()
export class ValidateResourcesPipe implements PipeTransform {
  constructor (
    private resourceRepository: ResourceRepository,
  ) {}

  async transform (updateResources: UpdateResourcesDTO): Promise<UpdateResourcesDTO> {
    for (const { id } of updateResources.resources) {
      const exists = await this.resourceRepository.exists({ id });

      if (!exists) {
        throw new InvalidEntityIdException('Resource');
      }
    }

    return updateResources;
  }
}
