import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class MarksDTO {
  @IsOptional()
    subjectId?: string;

  @Transform((n) => +n)
  @IsOptional()
    year?: number;

  @Transform((n) => +n)
  @IsOptional()
    semester?: number;
}