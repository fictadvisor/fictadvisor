import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';
import { TeacherResponse } from './TeacherResponse';

export class TeacherWithRolesResponse extends TeacherResponse {
  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
    description: 'List of teacher\'s roles',
  })
    roles: TeacherRole[];
}