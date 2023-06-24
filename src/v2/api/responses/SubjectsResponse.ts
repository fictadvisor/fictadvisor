import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';

export class SubjectsResponse {
  @ApiProperty({
    type: [SubjectResponse],
  })
    subjects: SubjectResponse[];
}