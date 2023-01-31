import { SubjectState } from '../../../database/entities/subject.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class SubjectUpdateDto {
  name?: string;

  description?: string;

  @IsOptional()
  @IsEnum(SubjectState)
    state?: SubjectState;
}
