import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';
import { TeacherRole } from '../enums/db/TeacherRoleEnum';

export class TeacherWithRolesResponse extends TeacherResponse {
  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
    description: 'List of teacher\'s roles',
  })
    roles: TeacherRole[];
}