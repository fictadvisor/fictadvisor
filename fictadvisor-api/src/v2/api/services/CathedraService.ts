import { Injectable } from '@nestjs/common';
import { CathedraRepository } from '../../database/repositories/CathedraRepository';
import { CreateCathedraDTO } from '../dtos/CreateCathedraDTO';
import { UpdateCathedraDTO } from '../dtos/UpdateCathedraDTO';
import { DbCathedra } from '../../database/entities/DbCathedra';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { DatabaseUtils } from '../../database/DatabaseUtils';

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

  async getAll (body: QueryAllDTO) {
    const search = DatabaseUtils.getSearch(body, 'name', 'abbreviation');
    const sort = DatabaseUtils.getSort(body, 'name');

    const data = {
      ...sort,
      where: {
        ...search,
      },
    };
    return await DatabaseUtils.paginate<DbCathedra>(this.cathedraRepository, body, data);
  }
}
