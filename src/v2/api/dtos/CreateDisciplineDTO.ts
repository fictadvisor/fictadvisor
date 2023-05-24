import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class CreateDisciplineDTO {
  @IsNotEmpty(validationOptionsMsg('Group id can not be empty'))
    groupId: string;

  @IsNotEmpty(validationOptionsMsg('Subject id can not be empty'))
    subjectId: string;

  @IsNumber()
    semester: number;

  @IsNumber()
    year: number;

  @IsOptional()
    isSelective?: boolean;

  @IsOptional()
    evaluatingSystem?: string;

  @IsOptional()
    resource?: string;
}