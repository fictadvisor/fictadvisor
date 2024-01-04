import { ApiProperty } from '@nestjs/swagger';

class RemainingSelective {
    @ApiProperty()
      disciplineId: string;

    @ApiProperty()
      subjectName: string;
}

export class RemainingSelectiveResponse {
    @ApiProperty()
      availableSelectiveAmount: number;

    @ApiProperty()
      year: number;

    @ApiProperty()
      semester: number;

    @ApiProperty({
      type: [RemainingSelective],
    })
      remainingSelective: RemainingSelective[];
}