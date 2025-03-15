import { ApiProperty } from '@nestjs/swagger';
import { PageTextResponse } from './page-text.response';

export class PageTextsResponse {
    @ApiProperty({
      description: 'Array of page texts',
      type: [PageTextResponse],
    })
      pageTexts: PageTextResponse[];
}
