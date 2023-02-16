import { Injectable, PipeTransform } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { ResourceService } from './ResourcesService';

@Injectable()
export class ResourceByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor(
    private resourceService: ResourceService
  ) {}

  async transform(value: string): Promise<string> {
    const resource: Subject = await this.resourceService.get(value);
    if (!resource) {
      throw new InvalidEntityIdException('resource');
    }
    return value;
  }
}