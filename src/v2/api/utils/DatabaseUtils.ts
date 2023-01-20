import { Page, PageDTO } from './dto/PageDTO';
import { Search, SearchDTO } from './dto/SearchDTO';
import { Sort, SortDTO } from './dto/SortDTO';

export class DatabaseUtils {

  static getSearch<T>({ search }: SearchDTO, ...fields: (keyof T)[]): Search<T> | object {
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

  static getPage({ page = 0, pageSize }: PageDTO): Page | object {
    page = +page;
    pageSize = +pageSize;
    if (!pageSize) return {};
    return {
      skip: page * pageSize,
      take: pageSize,
    };
  }

  static getSort<T>({ sort }: SortDTO<T>): Sort<T> | object {
    if (!sort) return {};
    return {
      orderBy: sort,
    };
  }
}