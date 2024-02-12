import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { QuerySemesterDTO } from './QuerySemesterDTO';

export enum SortCommentsEnum {
  TEACHER = 'teacher',
  SUBJECT = 'subject',
  SEMESTER = 'semester',
}

export class QueryAllCommentsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    enum: SortCommentsEnum,
    default: SortCommentsEnum.SEMESTER,
  })
  @IsEnum(SortCommentsEnum, validationOptionsMsg('Sort must be an enum'))
    sort?: string;

  @ApiPropertyOptional({
    description: 'Array of studying semesters',
  })
  @IsOptional()
  @ValidateNested(validationOptionsMsg('Each value of semesters must be an studying semester', true))
  @Type(() => QuerySemesterDTO)
    semesters?: QuerySemesterDTO[];
}
