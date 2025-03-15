import { ApiProperty } from '@nestjs/swagger';
import { ContactResponse } from './contact.response';
import { TeacherFullResponse } from './teacher-full.response';

export class TeacherWithContactsFullResponse extends TeacherFullResponse {
  @ApiProperty({
    description: 'Array of teacher`s contacts',
    type: [ContactResponse],
  })
    contacts: ContactResponse[];
}
