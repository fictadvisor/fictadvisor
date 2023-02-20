import { IsOptional } from 'class-validator';

export class MarksDTO {
  @IsOptional()
    subjectId?: string;
  
  @IsOptional()
    year?: number;
  
  @IsOptional()
    semester?: number;
}