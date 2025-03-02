import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateResourcesDTO } from '@fictadvisor/utils/requests';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';
import { ResourceRepository } from '../../database/v2/repositories/ResourceRepository';

@Injectable()
export class ValidateResourcesPipe implements PipeTransform {
  constructor (
    private resourceRepository: ResourceRepository
  ) {}

  async transform (
    updateResources: UpdateResourcesDTO
  ): Promise<UpdateResourcesDTO> {
    for (const resource of updateResources.resources) {
      const existingResource = await this.resourceRepository.find({
        id: resource.id,
      });

      if (!existingResource) {
        throw new InvalidEntityIdException('Resource');
      }
    }

    return updateResources;
  }
}
