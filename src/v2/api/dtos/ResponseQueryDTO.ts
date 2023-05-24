import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseQueryDTO {
  @IsOptional()
    subjectId?: string;

  @Type(() => Number)
  @IsOptional()
    year?: number;

  @Type(() => Number)
  @IsOptional()
    semester?: number;
}