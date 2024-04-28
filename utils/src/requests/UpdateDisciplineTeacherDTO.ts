import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { TeacherRole } from '../enums/db/TeacherRoleEnum';

export class UpdateDisciplineTeacherDTO {
  @ApiProperty({
    enum: [TeacherRole],
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(TeacherRole, { each: true })
    roles: TeacherRole[];
}