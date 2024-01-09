import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortQATParam } from './SortQATParam';
import { OrderQAParam } from './OrderQAParam';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { TeacherRole } from '@prisma/client';

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
    description: 'Teacher\'s roles',
    type: [TeacherRole],
    enum: TeacherRole,
  })
  @Transform(({ value }) => Array.isArray(value) ? value : Array(value))
  @IsEnum(TeacherRole, validationOptionsMsg('Each element of roles should be an enum', true))
  @IsArray(validationOptionsMsg('Roles must be an array'))
  @IsOptional()
    roles?: TeacherRole[];
}