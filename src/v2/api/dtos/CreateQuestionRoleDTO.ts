import { TeacherRole } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionRoleDTO {
  @ApiProperty({
    enum: TeacherRole,
  })
  @IsEnum(TeacherRole)
  @IsNotEmpty(validationOptionsMsg('Role can not be empty'))
    role: TeacherRole;

  @ApiProperty()
  @IsBoolean(validationOptionsMsg('Visibility parameter is not a boolean'))
  @IsNotEmpty(validationOptionsMsg('Visibility parameter can not be empty'))
    isShown: boolean;

  @ApiProperty()
  @IsBoolean(validationOptionsMsg('Requirement parameter is not a boolean'))
  @IsNotEmpty(validationOptionsMsg('Requirement parameter can not be empty'))
    isRequired: boolean;
}