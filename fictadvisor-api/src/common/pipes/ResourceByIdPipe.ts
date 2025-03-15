import { Injectable, PipeTransform } from '@nestjs/common';
import { ResourceRepository } from '../../database/v2/repositories/ResourceRepository';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

@Injectable()
export class ResourceByIdPipe implements PipeTransform {
  constructor (
    private resourceRepository: ResourceRepository
  ) {}

  async transform (id: string): Promise<string> {
    const resource = await this.resourceRepository.findOne({ id });
    if (!resource) {
      throw new InvalidEntityIdException('Resource');
    }
    return id;
  }
}
