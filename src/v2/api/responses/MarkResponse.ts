import { ApiProperty } from '@nestjs/swagger';

class MarkResponse {
  @ApiProperty()
    name: string;

  @ApiProperty()
    amount: number;

  @ApiProperty()
    type: string;

  @ApiProperty()
    mark: number | [number];
}


export class MarksResponse {
  @ApiProperty({
    type: [MarkResponse],
  })
    marks: MarksResponse[];
}