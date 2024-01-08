import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';

export class TeacherRolesResponse {
  @ApiProperty({
    description: 'List of teacher roles',
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];
}