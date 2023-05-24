import { TeacherRole } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class CreateQuestionRoleDTO {
  @IsEnum(TeacherRole)
  @IsNotEmpty(validationOptionsMsg('Role can not be empty'))
    role: TeacherRole;

  @IsBoolean(validationOptionsMsg('Visibility parameter is not a boolean'))
  @IsNotEmpty(validationOptionsMsg('Visibility parameter can not be empty'))
    isShown: boolean;

  @IsBoolean(validationOptionsMsg('Requirement parameter is not a boolean'))
  @IsNotEmpty(validationOptionsMsg('Requirement parameter can not be empty'))
    isRequired: boolean;
}