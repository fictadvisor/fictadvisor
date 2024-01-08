import { ApiProperty } from '@nestjs/swagger';
import { ContactResponse } from './ContactResponse';
import { TeacherResponse } from './TeacherResponse';
import { TeacherRole } from '@prisma/client';

export class TeacherWithContactAndRoleResponse extends TeacherResponse {
  @ApiProperty({
    description: 'List of teacher roles',
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];

  @ApiProperty({
    description: 'List of contacts',
    type: [ContactResponse],
  })
    contacts: ContactResponse[];

  @ApiProperty({
    description: 'Rating of a specific teacher',
  })
    rating: number;
}
