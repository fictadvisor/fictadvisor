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
    description: 'Ids of disciplines',
  })
    disciplines: string[];

  @ApiProperty({
    description: 'Amount of disciplines',
  })
    amount: number;
}

export class SelectiveBySemestersResponse {
  @ApiProperty({
    type: [SelectiveBySemesters],
    description: 'Selective disciplines',
  })
    selective: SelectiveBySemesters[];
}
