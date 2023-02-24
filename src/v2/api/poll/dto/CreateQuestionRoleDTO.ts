import { TeacherRole } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class CreateQuestionRoleDTO {
  @IsEnum(TeacherRole)
  @IsNotEmpty(validationOptionsMsg('Role can\'t be empty'))
    role: TeacherRole;

  @IsBoolean()
  @IsNotEmpty(validationOptionsMsg('Visibility parameter can\'t be empty'))
    isShown: boolean;

  @IsBoolean()
  @IsNotEmpty(validationOptionsMsg('Requirement parameter can\'t be empty'))
    isRequired: boolean;
}