import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { DisciplineTypeEnum } from '../enums';
import { validationOptionsMsg } from '../validation.util';

export class UpdateDisciplineTeacherDTO {
  @ApiProperty({
    description: 'Array of discipline types of discipline teacher',
    enum: DisciplineTypeEnum,
    type: [DisciplineTypeEnum],
  })
  @IsNotEmpty(validationOptionsMsg('Discipline types can not be empty'))
  @IsArray(validationOptionsMsg('Discipline types must be an array'))
  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Each discipline type in array must be an enum', true))
    disciplineTypes: DisciplineTypeEnum[];
}
