import { ApiProperty } from '@nestjs/swagger';

export class URLResponse {
  @ApiProperty()
    url: string;
}