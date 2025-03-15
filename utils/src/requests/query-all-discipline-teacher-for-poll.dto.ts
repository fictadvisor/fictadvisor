import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { validationOptionsMsg } from '../validation.util';
import {
  SortQATParam,
  OrderQAParam,
  DisciplineTypeEnum,
} from '../enums';

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

  @ApiPropertyOptional({
    description: 'Teacher\'s discipline types',
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
  })
  @Transform(({ value }) => Array.isArray(value) ? value : Array(value))
  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Each element of discipline types should be an enum', true))
  @IsArray(validationOptionsMsg('Discipline types must be an array'))
  @IsOptional()
    disciplineTypes?: DisciplineTypeEnum[];
}
