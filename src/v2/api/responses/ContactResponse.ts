import { ApiProperty } from '@nestjs/swagger';

export class ContactResponse {
  @ApiProperty({
    description: 'Contact id',
  })
    id: string;

  @ApiProperty({
    description: 'Contact name',
  })
    name: string;

  @ApiProperty({
    description: 'Display name of the contact',
  })
    displayName: string;

  @ApiProperty({
    description: 'Contact link',
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