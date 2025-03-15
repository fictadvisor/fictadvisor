import { Injectable } from '@nestjs/common';
import {
  CreateCathedraDTO,
  UpdateCathedraDTO,
  QueryAllCathedrasDTO,
} from '@fictadvisor/utils/requests';
import { SortQACParam } from '@fictadvisor/utils/enums';
import { DatabaseUtils } from '../../../database/database.util';
import { DbCathedra } from '../../../database/v2/entities/cathedra.entity';
import { CathedraRepository } from '../../../database/v2/repositories/cathedra.repository';

@Injectable()
export class CathedraService {
  constructor (
    private cathedraRepository: CathedraRepository,
  ) {}

  create (body: CreateCathedraDTO): Promise<DbCathedra> {
    const { teachers, ...data } = body;
    return this.cathedraRepository.create({
      ...data,
      teachers: {
        createMany: {
          data: teachers?.map((teacherId) => ({ teacherId })) || [],
        },
      },
    });
  }

  async update (id: string, body: UpdateCathedraDTO): Promise<DbCathedra>  {
    const { addTeachers, deleteTeachers, ...data } = body;
    return this.cathedraRepository.updateById(id, {
      ...data,
      teachers: {
        deleteMany: {
          teacherId: {
            in: deleteTeachers || [],
          },
        },
        createMany: {
          data: addTeachers?.map((teacherId) => ({ teacherId })) || [],
        },
      },
    });
  }

  async delete (id: string): Promise<DbCathedra> {
    return this.cathedraRepository.deleteById(id);
  }

  async getAll (query: QueryAllCathedrasDTO) {
    const search = {
      AND: [
        this.getCathedraSearch.name(query.search),
        this.getCathedraSearch.abbreviation(query.abbreviation),
        this.getCathedraSearch.divisions(query.divisions),
      ],
    };

    const sort = query.sort === SortQACParam.TEACHERS ? {
      orderBy: {
        teachers: {
          _count: query?.order || 'asc',
        },
      },
    } : DatabaseUtils.getSort(query, SortQACParam.NAME);

    const data = {
      ...sort,
      where: search,
    };

    return await DatabaseUtils.paginate<DbCathedra>(this.cathedraRepository, query, data);
  }

  private getCathedraSearch = {
    name: (search: string) => DatabaseUtils.getSearch({ search }, 'name'),
    abbreviation: (search: string) => DatabaseUtils.getSearch({ search }, 'abbreviation'),
    divisions: (divisions: string[]) => DatabaseUtils.getSearchByArray(divisions, 'division'),
  };

  async getAllDivisions () {
    const cathedras = await this.cathedraRepository.findMany({
      distinct: ['division'],
    });
    return { divisions: cathedras.map((cathedra) => cathedra.division) };
  }

  async getById (cathedraId: string) {
    return this.cathedraRepository.findById(cathedraId);
  }
}
