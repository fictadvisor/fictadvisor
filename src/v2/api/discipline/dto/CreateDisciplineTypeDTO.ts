import { DisciplineTypeEnum } from '@prisma/client';
import { validationOptionsMsg } from '../../../utils/GLOBALS';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateDisciplineTypeDTO {
  @IsNotEmpty(validationOptionsMsg('first_name can\'t be empty'))
    disciplineId: string;

  @IsEnum(DisciplineTypeEnum)
    name: DisciplineTypeEnum;
}