import { PageTextResponse } from './PageTextResponse';
import { ApiProperty } from '@nestjs/swagger';

export class PageTextsResponse {
    @ApiProperty({
      description: 'Array of page texts',
      type: [PageTextResponse],
    })
      pageTexts: PageTextResponse[];
}