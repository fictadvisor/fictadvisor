import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthLinkResponse {
  @ApiProperty({
    description: 'Google auth link, used to get the needed permissions from the user',
  })
    url: string;
}
