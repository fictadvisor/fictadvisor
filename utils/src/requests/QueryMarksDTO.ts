import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryMarksDTO {
  @ApiPropertyOptional({
    description: 'Subject id'
  })
  @IsOptional()
    subjectId?: string;

  @ApiPropertyOptional({
    description: 'Studying year'
  })
  @Type(() => Number)
  @IsOptional()
    year?: number;

  @ApiPropertyOptional({
    description: 'Number of studying semester (1/2)'
  })
  @Type(() => Number)
  @IsOptional()
    semester?: number;
}
