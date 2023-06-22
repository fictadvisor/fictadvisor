import { ApiProperty } from '@nestjs/swagger';

export class SemesterResponse {
  @ApiProperty()
    year: number;

  @ApiProperty()
    semester: number;

  @ApiProperty()
    startDate: Date;
  
  @ApiProperty()
    endDate: Date;
}
