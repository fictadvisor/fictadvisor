import { IsIn, IsNumberString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAllTeacherDTO {
  @ApiPropertyOptional()
  @IsNumberString({}, {
    message: 'page must be a number',
  })

  @IsOptional()
    page?: number;

  @ApiPropertyOptional()
  @IsNumberString({}, {
    message: 'pageSize must be a number',
  })

  @IsOptional()
    pageSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
    search?: string;

  @ApiPropertyOptional()
  @IsOptional()
    sort?: string;

  @ApiPropertyOptional()
  @IsIn(['asc', 'desc'], {
    message: 'wrong value for order',
  })
  @IsOptional()
    order?: 'asc' | 'desc';

  @ApiPropertyOptional()
  @IsOptional()
    group?: string;
}