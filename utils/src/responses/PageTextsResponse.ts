import { ApiProperty } from '@nestjs/swagger';
import { PageTextResponse } from './PageTextResponse';

export class PageTextsResponse {
    @ApiProperty({
      description: 'Array of page texts',
      type: [PageTextResponse],
    })
      pageTexts: PageTextResponse[];
}