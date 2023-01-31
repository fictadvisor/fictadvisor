import { type Page, type PageDTO, type Search, type SearchDTO, type Sort, type SortDTO } from '../../utils/QueryAllDTO';

export class DatabaseUtils {
  static getSearch<T>({ search }: SearchDTO, ...fields: Array<keyof T>): Search<T> | object {
    if (!search) return {};
    return {
      OR: fields.map((field) => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    };
  }

  static getPage ({ page = 0, pageSize }: PageDTO): Page | object {
    page = +page;
    pageSize = +pageSize;
    if (!pageSize) return {};
    return {
      skip: page * pageSize,
      take: pageSize,
    };
  }

  static getSort ({ sort, order = 'asc' }: SortDTO): Sort | object {
    if (!sort) return {};
    return {
      orderBy: {
        [sort]: order,
      },
    };
  }
}
