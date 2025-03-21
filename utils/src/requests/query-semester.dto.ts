import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../validation.util';

export class QuerySemesterDTO {
  @ApiPropertyOptional({
    description: 'Year of studying',
    default: null,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, validationOptionsMsg('Year must be a number'))
    year?: number;

  @ApiPropertyOptional({
    description: 'Semester of studying',
    default: null,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, validationOptionsMsg('Semester must be a number'))
    semester?: number;
}
