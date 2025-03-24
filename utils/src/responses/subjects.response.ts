import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './subject.response';

export class SubjectsResponse {
  @ApiProperty({
    description: 'List of subjects',
    type: [SubjectResponse],
  })
    subjects: SubjectResponse[];
}
