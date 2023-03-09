import { IsIn, IsNumberString, IsOptional } from 'class-validator';

export class QueryAllSubjectDTO {
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

  @IsOptional()
    group?: string;
}