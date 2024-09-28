import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { TeacherRole } from '../enums';
import { validationOptionsMsg } from '../ValidationUtil';

export class UpdateDisciplineTeacherDTO {
  @ApiProperty({
    description: 'TeacherRole of DisciplineTeacher',
    enum: TeacherRole,
    type: [TeacherRole],
  })
  @IsNotEmpty(validationOptionsMsg('Roles cannot be empty'))
  @IsArray(validationOptionsMsg('Roles must be an array'))
  @IsEnum(TeacherRole, validationOptionsMsg('Each element of roles must be an enum', true))
    roles: TeacherRole[];
}
