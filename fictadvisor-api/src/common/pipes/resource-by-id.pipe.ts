import { Injectable, PipeTransform } from '@nestjs/common';
import { ResourceRepository } from '../../database/v2/repositories/resource.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class ResourceByIdPipe implements PipeTransform {
  constructor (
    private resourceRepository: ResourceRepository,
  ) {}

  async transform (id: string): Promise<string> {
    const exists = await this.resourceRepository.exists({ id });
    if (!exists) {
      throw new InvalidEntityIdException('Resource');
    }
    return id;
  }
}
