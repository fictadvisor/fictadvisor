import { Injectable } from '@nestjs/common';
import { CathedraRepository } from '../../database/repositories/CathedraRepository';
import { CreateCathedraDTO } from '../dtos/CreateCathedraDTO';
import { UpdateCathedraDTO } from '../dtos/UpdateCathedraDTO';
import { DbCathedra } from '../../database/entities/DbCathedra';

@Injectable()
export class CathedraService {
  constructor (
    private cathedraRepository: CathedraRepository,
  ) {}

  async create (body: CreateCathedraDTO): Promise<DbCathedra> {
    return this.cathedraRepository.create(body);
  }

  async update (id: string, body: UpdateCathedraDTO): Promise<DbCathedra>  {
    return this.cathedraRepository.updateById(id, body);
  }

  async delete (id: string): Promise<DbCathedra> {
    return this.cathedraRepository.deleteById(id);
  }
}
