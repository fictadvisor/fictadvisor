import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';


export class SubjectCountResponse extends SubjectResponse {
  @ApiProperty({
    minimum: 1,
  })
    amount: number;
}

