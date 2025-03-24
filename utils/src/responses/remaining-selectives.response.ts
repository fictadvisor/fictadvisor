import { ApiProperty } from '@nestjs/swagger';

export class RemainingSelective {
  @ApiProperty({
    description: 'Id of the certain selective discipline',
  })
    disciplineId: string;

  @ApiProperty({
    description: 'The name of the certain selective discipline',
  })
    subjectName: string;
}

export class RemainingSelectivesResponse {
  @ApiProperty({
    description: 'The number indicating the amount of selective disciplines',
  })
    availableSelectiveAmount: number;

  @ApiProperty({
    description: 'The certain year of the selective discipline',
  })
    year: number;

  @ApiProperty({
    description: 'The certain semester of the selective discipline',
  })
    semester: number;

  @ApiProperty({
    type: [RemainingSelective],
    description: 'An array of objects with information on selected disciplines',
  })
    remainingSelectives: RemainingSelective[];
}