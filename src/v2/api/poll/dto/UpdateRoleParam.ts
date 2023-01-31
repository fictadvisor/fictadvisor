import { IsEnum, IsIn, IsNotEmpty } from 'class-validator';
import { TeacherRole } from "@prisma/client";

export class UpdateRoleParam {
  @IsNotEmpty()
  questionId: string;

  @IsEnum(TeacherRole, {
    message: 'the role is not an enum',
  })
  role: TeacherRole;
}