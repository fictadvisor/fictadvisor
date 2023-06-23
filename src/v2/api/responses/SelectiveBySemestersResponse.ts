import { ApiProperty } from '@nestjs/swagger';

class SelectiveBySemesters {
  @ApiProperty()
    year: number;

  @ApiProperty()
    semester: number;

  @ApiProperty()
    disciplines: string[];

  @ApiProperty()
    amount: number;
}

export class SelectiveBySemestersResponse {
  @ApiProperty({
    type: [SelectiveBySemesters],
  })
    selective: SelectiveBySemesters[];
}
