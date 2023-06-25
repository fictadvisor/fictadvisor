import { ApiProperty } from '@nestjs/swagger';

export class ContactsResponse {
  @ApiProperty()
    link: string;

  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    displayName: string;
}