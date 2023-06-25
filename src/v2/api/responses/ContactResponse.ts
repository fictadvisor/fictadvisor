import { ApiProperty } from '@nestjs/swagger';

export class ContactResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    link: string;
  
  @ApiProperty()
    name: string;
  
  @ApiProperty()
    displayName: string;
}
