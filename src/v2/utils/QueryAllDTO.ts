import { IsIn, IsInt } from "class-validator";

export class QueryAllDTO {
  @IsInt({
    message: 'page must be a number'
  })
  page?: number;

  @IsInt({
    message: 'pageSize must be a number'
  })
  pageSize?: number;

  search?: string;

  sort?: string;

  @IsIn(['asc', 'desc'], {
    message: 'wrong value for order'
  })
  order?: 'asc' | 'desc';
}

export class SortDTO {
  sort?: string;
  order?: 'asc' | 'desc';
}

export class SearchDTO {
  search?: string;
}

export class PageDTO {
  page?: number;
  pageSize?: number;
}

export class Page {
  take: number;
  skip: number;
}


export class Search<T> {
  OR: {
    [k in keyof T]: {
      contains: string;
      mode: 'default' | 'insensitive';
    }
  }[];
}

export class Sort {
  orderBy: {
    [k: string]: 'asc' | 'desc';
  };
}