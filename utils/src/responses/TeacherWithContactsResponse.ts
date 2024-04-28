import { ApiProperty } from '@nestjs/swagger';
import { ContactResponse } from './ContactResponse';
import { TeacherWithRolesAndCathedrasResponse } from './TeacherWithRolesAndCathedrasResponse';

export class TeacherWithContactsResponse extends TeacherWithRolesAndCathedrasResponse {
  @ApiProperty({
    type: [ContactResponse],
    description: 'An array of teacher contacts',
  })
    contacts: ContactResponse[];
}