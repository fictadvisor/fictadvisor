import { IsEnum, IsNotEmpty } from 'class-validator';
import { DisciplineTypeEnum } from '../enums/db/discipline-type.enum';
import { validationOptionsMsg } from '../validation.util';

export class CreateDisciplineTypeDTO {
  @IsNotEmpty(validationOptionsMsg('Discipline id can not be empty'))
    disciplineId: string;

  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Name is not an enum'))
    name: DisciplineTypeEnum;
}
