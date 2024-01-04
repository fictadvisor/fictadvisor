import { ApiProperty } from '@nestjs/swagger';

class MarkArray {
  @ApiProperty()
    1: number;

  @ApiProperty()
    2: number;

  @ApiProperty()
    3: number;

  @ApiProperty()
    4: number;

  @ApiProperty()
    5: number;

  @ApiProperty()
    6: number;

  @ApiProperty()
    7: number;

  @ApiProperty()
    8: number;

  @ApiProperty()
    9: number;

  @ApiProperty()
    10: number;
}

class MarkResponse {
  @ApiProperty()
    name: string;

  @ApiProperty()
    amount: number;

  @ApiProperty()
    type: string;

  @ApiProperty({
    oneOf: [
      { type: 'number' },
      { type: 'number[] (from 1 to 10)' },
    ],
  })
    mark: number | MarkArray;
}


export class MarksResponse {
  @ApiProperty({
    type: [MarkResponse],
  })
    marks: MarkResponse[];
}