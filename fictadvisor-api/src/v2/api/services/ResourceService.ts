import { Injectable } from '@nestjs/common';
import { CreateResourceDTO } from '../dtos/CreateResourceDTO';
import { UpdateResourceDTO } from '../dtos/UpdateResourceDTO';
import { ResourceRepository } from '../../database/repositories/ResourceRepository';
import { StudentResource } from '@prisma/client';
import { UpdateResourcesDTO, UpdateResourcesDTOItem } from '../dtos/UpdateResourcesDTO';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { QueryAllResourcesDTO } from '../dtos/QueryAllResourcesDTO';

@Injectable()
export class ResourceService {
  constructor (
    private resourceRepository: ResourceRepository,
  ) {}

  async getAll (body: QueryAllResourcesDTO) {
    return this.resourceRepository.findMany({
      where: body.ids
        ? {
          id: {
            in: body.ids,
          },
        } 
        : {},
    });
  }

  async get (id: string) {
    return this.resourceRepository.findById(id);
  }

  async create (body: CreateResourceDTO) {
    return this.resourceRepository.create(body);
  }
    
  async update (id: string, body: UpdateResourceDTO) {
    return this.resourceRepository.updateById(id, body);
  }

  async updateMany (body: UpdateResourcesDTO) {
    await this.resourcesValidation(body.resources);

    const updResources: StudentResource[] = [];
    for (const resource of body.resources) {
      const updResource = await this.update(resource.id, resource);
      updResources.push(updResource);
    }

    return updResources;
  }

  async resourcesValidation (resources: UpdateResourcesDTOItem[]) {
    for (const resource of resources) {
      if (!await this.resourceRepository.find({ id: resource.id })) {
        throw new InvalidEntityIdException('Resource');
      }
    }
  }

  async delete (id: string) {
    await this.resourceRepository.deleteById(id);
  }
}