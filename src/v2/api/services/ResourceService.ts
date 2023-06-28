import { Injectable } from '@nestjs/common';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { CreateResourceDTO } from '../dtos/CreateResourceDTO';
import { UpdateResourceDTO } from '../dtos/UpdateResourceDTO';
import { ResourceRepository } from '../../database/repositories/ResourceRepository';

@Injectable()
export class ResourceService {
  constructor (
    private resourceRepository: ResourceRepository
  ) {}

  async getAll (body: QueryAllDTO) {
    return this.resourceRepository.getAll(body);
  }

  async get (id: string) {
    return this.resourceRepository.get(id);
  }

  async create (body: CreateResourceDTO) {
    return this.resourceRepository.create(body);
  }
    
  async update (id: string, body: UpdateResourceDTO) {
    return this.resourceRepository.update(id, body);
  }

  async delete (id: string) {
    await this.resourceRepository.delete(id);
  }
}