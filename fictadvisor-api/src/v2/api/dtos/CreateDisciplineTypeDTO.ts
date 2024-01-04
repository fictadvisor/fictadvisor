import { DisciplineTypeEnum } from '@prisma/client';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateDisciplineTypeDTO {
  @IsNotEmpty(validationOptionsMsg('Discipline id can not be empty'))
    disciplineId: string;

  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Name is not an enum'))
    name: DisciplineTypeEnum;
}