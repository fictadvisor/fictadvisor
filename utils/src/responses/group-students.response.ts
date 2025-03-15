import { ApiProperty } from '@nestjs/swagger';
import { OrdinaryStudentResponse } from './student.response';

export class GroupStudentsResponse {
  @ApiProperty({
    type: [OrdinaryStudentResponse],
    description: 'List of ordinary students',
  })
    students: OrdinaryStudentResponse[];
}
