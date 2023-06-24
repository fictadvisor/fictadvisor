import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    displayName: string;

  @ApiPropertyOptional()
    link?: string;
}

