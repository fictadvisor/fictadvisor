import { PaginatedData } from './types/paginated.data';
import { Page, PageDTO, Search, SearchDTO, Sort, SortDTO } from '@fictadvisor/utils/requests';
import { RepositoryInterface } from './interfaces/repository.interface';
import { TInclude, TModels, TSort, TWhere, TypeMap } from './types/repository.types';

export type PaginateArgs<Map extends TypeMap, T extends TModels<Map>> = {
  where: TWhere<Map, T>;
  include?: TInclude<Map, T>;
  orderBy?: TSort<Map, T>;
}

export class DatabaseUtils {
  static getSearch<T> ({ search }: SearchDTO, ...fields: (keyof T)[]): Search<T> | object {
    if (!search) return {};
    const searchedNames = search.split(/\s+/g);
    return {
      AND: searchedNames.map((search) => ({
        OR: fields.map((field) => ({
          [field]: {
            contains: search,
            mode: 'insensitive',
          },
        })),
      })),
    };
  }

  static getStrictSearch (search: string | number, field: string) {
    if (!search) return {};
    return {
      [field]: search,
    };
  }

  static getSearchByArray (searches: string[] | object[], ...fields: string[]) {
    if (!searches) return {};
    const OR = [];

    for (const search of searches) {
      const element = {};
      for (const field of fields) {
        element[field] = search[field] ?? search;
      }
      OR.push(element);
    }

    return { OR };
  }

  protected static getPage ({ page = 0, pageSize }: PageDTO): Page {
    page = +page;
    pageSize = +pageSize;
    if (!pageSize) return;
    if (page === 0) {
      return {
        skip: 0,
        take: pageSize * 2,
      };
    }
    return {
      skip: (page - 1) * pageSize,
      take: pageSize * 3,
    };
  }

  static async generalPaginate<Map extends TypeMap, T extends TModels<Map>, Dto> (
    repository: RepositoryInterface<Dto, TWhere<Map, T>>,
    { page = 0, pageSize }: PageDTO,
    args: PaginateArgs<Map, T>
  ): Promise<PaginatedData<Dto>> {
    page = +page;
    pageSize = +pageSize;

    const result = await repository.findMany({
      ...args.where,
    }, args.include, this.getPage({ page, pageSize }), args.orderBy);
    const totalAmount = await repository.count(args.where);

    const totalPages = Math.ceil(totalAmount / pageSize);
    const pages = Math.ceil(result.length / pageSize);

    if (!pageSize) {
      return {
        data: result,
        pagination: {
          amount: result.length,
          totalAmount,
          totalPages,
          pageSize,
          page,
          prevPageElems: 0,
          nextPageElems: 0,
        },
      };
    }
    if (page === 0) {
      const data = result.slice(0, pageSize);
      return {
        data,
        pagination: {
          amount: data.length,
          totalAmount,
          totalPages,
          pageSize,
          page,
          prevPageElems: 0,
          nextPageElems: data.slice(pageSize).length,
        },
      };
    } else if (pages === 2) {
      const data = result.slice(pageSize);
      return {
        data,
        pagination: {
          amount: data.length,
          totalAmount,
          totalPages,
          pageSize,
          page,
          prevPageElems: data.slice(0, pageSize).length,
          nextPageElems: 0,
        },
      };
    }
    const data = result.slice(pageSize, pageSize * 2);
    return {
      data,
      pagination: {
        amount: data.length,
        totalAmount,
        totalPages,
        pageSize,
        page,
        prevPageElems: data.slice(0, pageSize).length,
        nextPageElems: data.slice(pageSize * 2).length,
      },
    };
  };

  static getSort ({ sort, order = 'asc' }: SortDTO, standardField: string): Sort {
    if (!sort) return {
      orderBy: [{
        [standardField]: order,
      }],
    };
    return {
      orderBy: [{
        [sort]: order,
      }],
    };
  }

  static getOptional (condition: boolean, obj: object) {
    return condition ? obj : {};
  }
}
