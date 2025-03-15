import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './subject.response';
import { TeacherWithRolesAndCathedrasResponse } from './teacher-with-roles-and-cathedras.response';

export class TeacherFullResponse extends TeacherWithRolesAndCathedrasResponse {
  @ApiProperty({
    description: 'Subject of a specific discipline',
    type: SubjectResponse,
  })
    subject: SubjectResponse;
}
