import { TeacherRole } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateQuestionRoleDTO {
  @IsEnum(TeacherRole)
  @IsNotEmpty()
  role: TeacherRole;

  @IsNotEmpty()
  isShown: boolean;

  @IsNotEmpty()
  isRequired: boolean;
}