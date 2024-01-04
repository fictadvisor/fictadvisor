import { IsIn, IsNumberString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortQASParam } from './SortQASParam';
import { OrderQAParam } from './OrderQAParam';

export class QueryAllSubjectDTO {
  @ApiPropertyOptional({
    description: 'Visualization parameter: access to parts of divided data',
  })
  @IsNumberString({}, {
    message: 'page must be a number',
  })
  @IsOptional()
    page?: number;

  @ApiPropertyOptional({
    description: 'Visualization parameter: Divide data by amount of subjects',
  })
  @IsNumberString({}, {
    message: 'pageSize must be a number',
  })
  @IsOptional()
    pageSize?: number;

  @ApiPropertyOptional({
    description: 'Accepts subject full name',
  })
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    enum: SortQASParam,
  })
  @IsOptional()
    sort?: string;

  @ApiPropertyOptional({
    enum: OrderQAParam,
    description: 'Ascending by default',
  })
  @IsIn(['asc', 'desc'], {
    message: 'wrong value for order',
  })
  @IsOptional()
    order?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'GroupId',
  })
  @IsOptional()
    group?: string;
}