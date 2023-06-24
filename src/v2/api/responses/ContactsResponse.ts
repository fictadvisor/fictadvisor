import { ApiProperty } from '@nestjs/swagger';
import { ContactResponse } from './ContactResponse';

export class ContactsResponse {
  @ApiProperty({
    type: [ContactResponse],
  })
    contacts: ContactResponse[];
}