import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { ResourceRepository } from '../../database/repositories/ResourceRepository';

@Injectable()
export class ResourceByIdPipe implements PipeTransform {
  constructor (
    private resourceRepository: ResourceRepository
  ) {}

  async transform (value: string): Promise<string> {
    const resource = await this.resourceRepository.findById(value);
    if (!resource) {
      throw new InvalidEntityIdException('Resource');
    }
    return value;
  }
}