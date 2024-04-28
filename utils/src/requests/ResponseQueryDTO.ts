import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
    subjectId?: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
    year?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
    semester?: number;
}