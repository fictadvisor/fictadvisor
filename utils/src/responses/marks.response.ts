import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class MarkArray {
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

export class MarkResponse {
  @ApiProperty()
  @AutoMap()
    name: string;

  @ApiProperty()
  @AutoMap()
    amount: number;

  @ApiProperty()
  @AutoMap()
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
