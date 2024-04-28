import { ApiProperty } from '@nestjs/swagger';

export class PageTextResponse {
    @ApiProperty({
      description: 'Key of specific page text',
    })
      key: string;

    @ApiProperty({
      description: 'Value of page text',
    })
      value: string;

    @ApiProperty({
      description: 'Link for page text',
    })
      link: string;

    @ApiProperty({
      description: 'Should page text be shown',
    })
      isShown: boolean;
}