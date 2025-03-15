import { ApiProperty } from '@nestjs/swagger';

export class ContactResponse {
  @ApiProperty({
    description: 'Id of a contact',
  })
    id: string;

  @ApiProperty({
    description: 'Name of a contact',
  })
    name: string;

  @ApiProperty({
    description: 'Display name of the contact',
  })
    displayName: string;

  @ApiProperty({
    description: 'Link of a contact',
    default: null,
  })
    link: string;
}

export class ContactsResponse {
  @ApiProperty({
    description: 'List of contacts',
    type: [ContactResponse],
  })
    contacts: ContactResponse[];
}