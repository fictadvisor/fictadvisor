import { Injectable } from '@nestjs/common';
import {
  CreateResourceDTO,
  UpdateResourceDTO,
  UpdateResourcesDTO,
  QueryAllResourcesDTO,
} from '@fictadvisor/utils/requests';
import { ResourceRepository } from '../../database/repositories/ResourceRepository';
import { StudentResource } from '@prisma/client';

@Injectable()
export class ResourceService {
  constructor (
    private resourceRepository: ResourceRepository,
  ) {}

  async getAll (body: QueryAllResourcesDTO): Promise<StudentResource[]> {
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

  async get (id: string): Promise<StudentResource | null> {
    return this.resourceRepository.findById(id);
  }

  async create (body: CreateResourceDTO): Promise<StudentResource> {
    return this.resourceRepository.create(body);
  }

  async update (id: string, body: UpdateResourceDTO):Promise<StudentResource> {
    return this.resourceRepository.updateById(id, body);
  }

  async updateMany (body: UpdateResourcesDTO): Promise<StudentResource[]> {
    const updResources: StudentResource[] = [];
    for (const resource of body.resources) {
      const updResource = await this.update(resource.id, resource);
      updResources.push(updResource);
    }

    return updResources;
  }

  async delete (id: string): Promise<void> {
    await this.resourceRepository.deleteById(id);
  }
}
