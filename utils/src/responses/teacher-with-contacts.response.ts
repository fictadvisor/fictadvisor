import { ApiProperty } from '@nestjs/swagger';
import { ContactResponse } from './contact.response';
import { TeacherWithRolesAndCathedrasResponse } from './teacher-with-roles-and-cathedras.response';

export class TeacherWithContactsResponse extends TeacherWithRolesAndCathedrasResponse {
  @ApiProperty({
    type: [ContactResponse],
    description: 'An array of teacher contacts',
  })
    contacts: ContactResponse[];
}
