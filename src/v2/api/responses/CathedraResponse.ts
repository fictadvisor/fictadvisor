import { ApiProperty } from '@nestjs/swagger';

export class CathedraResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    abbreviation: string;
}
