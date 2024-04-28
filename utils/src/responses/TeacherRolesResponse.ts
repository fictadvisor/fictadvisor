import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '../enums/db/TeacherRoleEnum';

export class TeacherRolesResponse {
  @ApiProperty({
    description: 'List of teacher roles',
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];
}