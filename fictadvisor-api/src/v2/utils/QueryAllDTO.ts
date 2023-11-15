import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { validationOptionsMsg } from './GLOBALS';

export class QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Number of the page',
  })
  @IsNumberString({}, {
    message: 'Page must be a number',
  })
  @IsOptional()
    page?: number;

  @ApiPropertyOptional({
    description: 'Amount of the elements in the page',
  })
  @IsNumberString({}, {
    message: 'PageSize must be a number',
  })
  @IsOptional()
    pageSize?: number;

  @ApiPropertyOptional({
    description: 'Symbols that should be in a filter',
  })
  @IsOptional()
  @IsString()
    search?: string;

  @ApiPropertyOptional({
    description: 'Sorting parameter',
  })
  @IsOptional()
    sort?: string;

  @ApiPropertyOptional({
    description: 'Sorting order',
    enum: ['asc', 'desc'],
  })
  @IsIn(['asc', 'desc'], validationOptionsMsg('Wrong value for order'))
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