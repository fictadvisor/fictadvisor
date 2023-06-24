import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';

export class TeacherRolesResponse {
  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];
}