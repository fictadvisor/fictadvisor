import { IsIn, IsNumberString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAllDTO {
  @ApiPropertyOptional()
  @IsNumberString({}, {
    message: 'Page must be a number',
  })
  @IsOptional()
    page?: number;

  @ApiPropertyOptional()
  @IsNumberString({}, {
    message: 'PageSize must be a number',
  })
  @IsOptional()
    pageSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
    search?: string;

  @ApiPropertyOptional()
  @IsOptional()
    sort?: string;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsIn(['asc', 'desc'], {
    message: 'Wrong value for order',
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