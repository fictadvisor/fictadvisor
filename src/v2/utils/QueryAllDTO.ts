import { IsIn, IsNumberString, IsOptional } from 'class-validator';

export class QueryAllDTO {
  @IsNumberString({}, {
    message: 'page must be a number',
  })
  @IsOptional()
  page?: number;

  @IsNumberString({}, {
    message: 'pageSize must be a number',
  })
  @IsOptional()
  pageSize?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  sort?: string;

  @IsIn(['asc', 'desc'], {
    message: 'wrong value for order',
  })
  @IsOptional()
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