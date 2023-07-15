import { ApiProperty } from '@nestjs/swagger';
import { OrdinaryStudentResponse } from './StudentResponse';

export class GroupStudentsResponse {
  @ApiProperty({
    type: [OrdinaryStudentResponse],
  })
    students: OrdinaryStudentResponse[];
}