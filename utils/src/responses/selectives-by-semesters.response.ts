import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SelectiveBySemestersResponse {
  @ApiProperty({
    description: 'Year number',
  })
  @AutoMap()
    year: number;

  @ApiProperty({
    description: 'Semester number',
  })
  @AutoMap()
    semester: number;

  @ApiProperty({
    description: 'Names of disciplines',
  })
  @AutoMap(() => [String])
    disciplines: string[];

  @ApiProperty({
    description: 'Amount of disciplines',
  })
  @AutoMap()
    amount: number;
}

export class SelectivesBySemestersResponse {
  @ApiProperty({
    type: [SelectiveBySemestersResponse],
    description: 'Selective disciplines',
  })
    selectives: SelectiveBySemestersResponse[];
}
