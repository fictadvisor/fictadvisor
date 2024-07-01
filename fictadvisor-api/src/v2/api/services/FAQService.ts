import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbFAQ } from '../../database/entities/DbFAQ';
import { FAQRepository } from '../../database/repositories/FAQRepository';
import { CreateFAQDTO, UpdateFAQDTO, QueryAllFAQsDTO } from '@fictadvisor/utils';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { PaginatedData } from '../datas/PaginatedData';

@Injectable()
export class FAQService {
  constructor (
    private readonly faqRepository: FAQRepository,
  ) {}

  async create (body: CreateFAQDTO): Promise<DbFAQ> {
    const { categories, ...faq } = body;
    return this.faqRepository.create({
      ...faq,
      categories: {
        createMany: {
          data: categories.map((categoryId) => ({ categoryId })),
        },
      },
    });
  }

  async getAll (query: QueryAllFAQsDTO):Promise<PaginatedData<DbFAQ>> {
    const search = {
      AND: [
        this.getSearch.text(query.search),
        this.getSearch.categories(query.categories),
      ],
    };

    const data: Prisma.FAQFindManyArgs = {
      where: search,
      orderBy: { [query.sort]: query.order || 'asc' },
    };

    return DatabaseUtils.paginate(this.faqRepository, query, data);
  }

  private getSearch = {
    text: (search: string) => DatabaseUtils.getSearch({ search }, 'text'),
    categories: (categories: string[]) => ({
      categories: {
        some: DatabaseUtils.getSearchByArray(categories, 'categoryId'),
      },
    }),
  };

  async get (id: string): Promise<DbFAQ> {
    return this.faqRepository.findById(id);
  }

  async update (id: string, body: UpdateFAQDTO): Promise<DbFAQ> {
    const { categories: categoriesIds, ...faq } = body;
    const categories = categoriesIds ? {
      deleteMany: { faqId: id },
      createMany: {
        data: categoriesIds.map((categoryId) => ({ categoryId })),
      },
    } : {};

    return this.faqRepository.updateById(id, {
      ...faq,
      categories,
    });
  }

  async delete (id: string): Promise<DbFAQ> {
    return this.faqRepository.deleteById(id);
  }
}
