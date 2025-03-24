import { ApiProperty } from '@nestjs/swagger';

export class URLResponse {
  @ApiProperty({
    description: 'The URL of the resource',
  })
    url: string;
}