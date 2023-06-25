import { ApiProperty } from '@nestjs/swagger';
import { ContactsResponse } from './ContactsResponse';
import { TeacherWithRatingAndRolesResponse } from './TeacherWithRatingAndRolesResponse';

export class TeacherWithContactsResponse extends TeacherWithRatingAndRolesResponse {
  @ApiProperty({
    type: [ContactsResponse],
  })
    contacts: ContactsResponse[];
}