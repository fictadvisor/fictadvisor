import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './subject.response';


export class SubjectCountResponse extends SubjectResponse {
  @ApiProperty({
    minimum: 1,
  })
    amount: number;
}

