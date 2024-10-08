import { Injectable } from '@nestjs/common';
import { DisciplineResourceRepository } from '../../database/repositories/DisciplineResourceRepository';
import { CreateDisciplineResourceDTO, QueryAllDisciplineResourcesDTO, SortDTO, UpdateDisciplineResourceDTO } from '@fictadvisor/utils/requests';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { Prisma } from '@prisma/client';
import { OrderQAParam } from '@fictadvisor/utils/enums';

@Injectable()
export class DisciplineResourceService {

  constructor (
    private disciplineResourceRepository: DisciplineResourceRepository,
  ) {}

  async create (body: CreateDisciplineResourceDTO) {
    const { categoryIds, ...resource } = body;
    return this.disciplineResourceRepository.create({
      ...resource,
      categories: {
        create: categoryIds.map((id) => ({
          category: {
            connect: { id },
          },
        })),
      },
    });
  }

  async updateById (id: string, body: UpdateDisciplineResourceDTO) {
    const { categoryIds, ...resource } = body;
    return this.disciplineResourceRepository.updateById(id, {
      ...resource,
      categories: {
        deleteMany: {},
        create: categoryIds.map((id) => ({
          category: {
            connect: { id },
          },
        })),
      },
    });
  }

  async deleteById (id: string) {
    return this.disciplineResourceRepository.deleteById(id);
  }

  private getResourceSorting ({ sort, order }: SortDTO) {
    if (!sort) sort = 'name';
    if (!order) order = OrderQAParam.ASC;
    const orderBy = [{ [sort]: order }, { ['name']: order }];

    return orderBy;
  }

  async getAll (query: QueryAllDisciplineResourcesDTO) {
    const search = {
      AND: [
        DatabaseUtils.getSearch({ search: query.search }, 'name', 'description', 'link'),
        DatabaseUtils.getStrictSearch(query.subjectId, 'subjectId'),
        DatabaseUtils.getStrictSearch(query.teacherId, 'teacherId'),
        DatabaseUtils.getStrictSearch(query.year, 'year'),
        DatabaseUtils.getStrictSearch(query.semester, 'semester'),
        {
          categories: {
            some: DatabaseUtils.getSearchByArray(query.categoryIds, 'categoryId'),
          },
        },
      ],
    };

    const sort = {
      orderBy: this.getResourceSorting({
        sort: query.sort,
        order: query.order,
      }),
    };

    const data: Prisma.ResourceFindManyArgs = {
      where: {
        ...search,
      },
      ...sort,
    };

    return DatabaseUtils.paginate(this.disciplineResourceRepository, query, data);
  }
}