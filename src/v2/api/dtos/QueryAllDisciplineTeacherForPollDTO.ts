import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { SortQATParam } from './SortQATParam';
import { OrderQAParam } from './OrderQAParam';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class QueryAllDisciplineTeacherForPollDTO {
  @ApiPropertyOptional({
    description: 'Accepts teacher full name',
  })
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    enum: SortQATParam,
    description: 'Sorting by field',
    default: 'lastName',
  })
  @IsEnum(SortQATParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQATParam;

  @ApiPropertyOptional({
    enum: OrderQAParam,
    description: 'Order in',
    default: 'asc',
  })
  @IsIn(['asc', 'desc'], validationOptionsMsg('Wrong value for order'))
  @IsOptional()
    order?: 'asc' | 'desc';
}