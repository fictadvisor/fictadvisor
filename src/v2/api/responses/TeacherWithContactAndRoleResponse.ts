import { ApiProperty } from '@nestjs/swagger';
import { ContactResponse } from './ContactResponse';
import { TeacherResponse } from './TeacherResponse';
import { TeacherRole } from '@prisma/client';

export class TeacherWithContactAndRoleResponse extends TeacherResponse {
  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];

  @ApiProperty({
    type: [ContactResponse],
  })
    contacts: ContactResponse[];

  @ApiProperty()
    rating: number;
}