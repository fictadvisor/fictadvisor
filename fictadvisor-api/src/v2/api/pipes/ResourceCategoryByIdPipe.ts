import { Injectable, PipeTransform } from '@nestjs/common';
import { ResourceCategoryRepository } from '../../database/repositories/ResourceCategoryRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class ResourceCategoryByIdPipe implements PipeTransform {

  constructor (
    private resourceCategoryRepository: ResourceCategoryRepository,
  ) {}

  async transform (categoryId: string) {
    const resourceCategory = await this.resourceCategoryRepository.findById(categoryId);
    if (!resourceCategory) {
      throw new InvalidEntityIdException('Resource category');
    }
    return categoryId;
  }
}