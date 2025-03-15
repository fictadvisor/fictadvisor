import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { AutoMap } from '@automapper/classes';

export class SubjectsResponse {
  @ApiProperty({
    description: 'List of subjects',
    type: [SubjectResponse],
  })
  @AutoMap(() => [SubjectResponse])
    subjects: SubjectResponse[];
}
