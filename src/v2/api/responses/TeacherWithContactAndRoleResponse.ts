import { ApiProperty } from '@nestjs/swagger';
import { TeacherRolesResponse } from './TeacherRolesResponse';
import { ContactResponse } from './ContactResponse';
import { TeacherResponse } from './TeacherResponse';

export class TeacherWithContactAndRoleResponse extends TeacherResponse {
  @ApiProperty()
    roles: TeacherRolesResponse;

  @ApiProperty({
    type: [ContactResponse],
  })
    contacts: ContactResponse[];
}