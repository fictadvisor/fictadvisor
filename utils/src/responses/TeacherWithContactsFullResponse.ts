import { ApiProperty } from '@nestjs/swagger';
import { ContactResponse } from './ContactResponse';
import { TeacherFullResponse } from './TeacherFullResponse';

export class TeacherWithContactsFullResponse extends TeacherFullResponse {
  @ApiProperty({
    description: 'Array of teacher`s contacts',
    type: [ContactResponse],
  })
    contacts: ContactResponse[];
}
