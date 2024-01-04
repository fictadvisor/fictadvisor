import { ApiProperty } from '@nestjs/swagger';

export class CathedraResponse {
  @ApiProperty({
    description: 'The id of the cathedra',
  })
    id: string;

  @ApiProperty({
    description: 'The name of the cathedra',
  })
    name: string;

  @ApiProperty({
    description: 'The abbreviation of the cathedra',
  })
    abbreviation: string;
}
