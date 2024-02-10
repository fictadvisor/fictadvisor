import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateDisciplineTeacherDTO {
  @ApiProperty({
    enum: TeacherRole,
    type: [TeacherRole],
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(TeacherRole, { each: true })
    roles: TeacherRole[];
}