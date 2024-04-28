import { IsOptional } from 'class-validator';

export class UpdateDisciplineDTO {
  @IsOptional()
    resource?: string;

  @IsOptional()
    evaluatingSystem?: string;

  @IsOptional()
    isSelective?: boolean;

  @IsOptional()
    subjectId?: string;
}