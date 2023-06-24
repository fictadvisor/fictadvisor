import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';


class SubjectCountResponse extends SubjectResponse {
  @ApiProperty({
    minimum: 1,
  })
    amount: number;
}
export class SubjectsCountResponse {
  @ApiProperty({
    type: [SubjectCountResponse],
  })
    subjects: SubjectCountResponse[];
}

