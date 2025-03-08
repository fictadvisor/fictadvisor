import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class CathedraResponse {
  @ApiProperty({
    description: 'The id of the cathedra',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'The name of the cathedra',
  })
  @AutoMap()
    name: string;

  @ApiProperty({
    description: 'The abbreviation of the cathedra',
  })
  @AutoMap()
    abbreviation: string;

  @ApiProperty({
    description: 'The name of the faculty/institute',
  })
  @AutoMap()
    division: string;
}
