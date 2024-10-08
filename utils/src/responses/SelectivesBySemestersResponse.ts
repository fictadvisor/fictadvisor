import { ApiProperty } from '@nestjs/swagger';

class SelectiveBySemesters {
  @ApiProperty({
    description: 'Year number',
  })
    year: number;

  @ApiProperty({
    description: 'Semester number',
  })
    semester: number;

  @ApiProperty({
    description: 'Names of disciplines',
  })
    disciplines: string[];

  @ApiProperty({
    description: 'Amount of disciplines',
  })
    amount: number;
}

export class SelectivesBySemestersResponse {
  @ApiProperty({
    type: [SelectiveBySemesters],
    description: 'Selective disciplines',
  })
    selectives: SelectiveBySemesters[];
}
