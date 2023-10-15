import { TeacherRole } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionRoleDTO {
  @ApiProperty({
    enum: TeacherRole,
    description: 'An enum of teacher roles\'s',
  })
  @IsEnum(TeacherRole)
  @IsNotEmpty(validationOptionsMsg('Role cannot be empty'))
    role: TeacherRole;

  @ApiProperty({
    description: 'Shows whether the teacher was selected last semester',
  })
  @IsBoolean(validationOptionsMsg('Visibility parameter is not a boolean'))
  @IsNotEmpty(validationOptionsMsg('Visibility parameter cannot be empty'))
    isShown: boolean;

  @ApiProperty({
    description: 'Shows whether roles are required',
  })
  @IsBoolean(validationOptionsMsg('Requirement parameter is not a boolean'))
  @IsNotEmpty(validationOptionsMsg('Requirement parameter cannot be empty'))
    isRequired: boolean;
}