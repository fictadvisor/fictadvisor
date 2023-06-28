import { PaginatedData } from '../api/datas/PaginatedData';
import { Page, PageDTO, Search, SearchDTO, Sort, SortDTO } from '../utils/QueryAllDTO';

export class WhereUnique<T> {
  OR: {
    [k in keyof T]: any;
  }[];
}

export class DatabaseUtils {

  static getSearch<T> ({ search }: SearchDTO, ...fields: (keyof T)[]): Search<T> | object {
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

  protected static getPage ({ page = 0, pageSize }: PageDTO): Page | object {
    page = +page;
    pageSize = +pageSize;
    if (!pageSize) return {};
    if (page === 0) {
      return {
        skip: 0,
        take: pageSize*2,
      };   
    }
    return {
      skip: (page-1)*pageSize,
      take: pageSize*3,
    };
  }

  static async paginate<T=any> (
    repository, 
    { page = 0, pageSize }: PageDTO, 
    args: object
  ): Promise<PaginatedData<T>> {
    page = +page;
    pageSize = +pageSize;

    const data = await repository.findMany({
      ...args,
      ...this.getPage({ page, pageSize }),
    });

    const pages = Math.ceil(data.length / pageSize);
    if (!pageSize) {
      return {
        data,
        meta: {
          pageSize,
          page,
          prevPageElems: 0,
          nextPageElems: 0,
        },
      };
    }
    if (page === 0) {
      return {
        data: data.slice(0, pageSize),
        meta: {
          pageSize,
          page,
          prevPageElems: 0,
          nextPageElems: data.slice(pageSize).length,
        },
      };
    } else if (pages === 2) {
      return {
        data: data.slice(pageSize),
        meta: {
          pageSize,
          page,
          prevPageElems: data.slice(0, pageSize).length,
          nextPageElems: 0,
        },
      };
    }
    return {
      data: data.slice(pageSize, pageSize*2),
      meta: {
        pageSize,
        page,
        prevPageElems: data.slice(0, pageSize).length,
        nextPageElems: data.slice(pageSize*2).length,
      },
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

  static getOptional (condition: boolean, obj: object) {
    return condition ? obj : {};
  }
}