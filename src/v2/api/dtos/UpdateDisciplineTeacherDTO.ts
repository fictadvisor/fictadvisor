import { TeacherRole } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateDisciplineTeacherDTO {
  @IsNotEmpty()
  @IsArray()
  @IsEnum(TeacherRole, { each: true })
    roles: TeacherRole[];
}