import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { DisciplineTypeEnum } from '../enums';

export class CreateQuestionRoleDTO {
  @ApiProperty({
    enum: DisciplineTypeEnum,
    description: 'An enum of teacher roles\'s',
  })
  @IsNotEmpty(validationOptionsMsg('Role cannot be empty'))
  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Role must be enum'))
    role: DisciplineTypeEnum;

  @ApiProperty({
    description: 'Shows whether the teacher was selected last semester',
  })
  @IsNotEmpty(validationOptionsMsg('Visibility parameter cannot be empty'))
  @IsBoolean(validationOptionsMsg('Visibility parameter must be a boolean'))
    isShown: boolean;

  @ApiProperty({
    description: 'Shows whether roles are required',
  })
  @IsNotEmpty(validationOptionsMsg('Requirement parameter cannot be empty'))
  @IsBoolean(validationOptionsMsg('Requirement parameter must be a boolean'))
    isRequired: boolean;
}
