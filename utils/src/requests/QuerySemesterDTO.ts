import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QuerySemesterDTO {
  @ApiPropertyOptional({
    description: 'Year of studying',
    default: null,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
    year?: number;

  @ApiPropertyOptional({
    description: 'Semester of studying',
    default: null,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
    semester?: number;
}