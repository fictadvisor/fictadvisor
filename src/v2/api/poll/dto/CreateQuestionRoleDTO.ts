import { TeacherRole } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateQuestionRoleDTO {
  @IsEnum(TeacherRole)
  @IsNotEmpty()
  role: TeacherRole;

  @IsBoolean()
  @IsNotEmpty()
  isShown: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isRequired: boolean;
}