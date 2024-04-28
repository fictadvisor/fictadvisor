import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { TeacherWithRolesAndCathedrasResponse } from './TeacherWithRolesAndCathedrasResponse';

export class TeacherFullResponse extends TeacherWithRolesAndCathedrasResponse {
  @ApiProperty({
    description: 'Subject of a specific discipline',
    type: SubjectResponse,
  })
    subject: SubjectResponse;
}