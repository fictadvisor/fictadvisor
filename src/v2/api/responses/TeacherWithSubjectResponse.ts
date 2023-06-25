import { TeacherWithContactsResponse } from './TeacherWithContactsResponse';
import { SubjectResponse } from './SubjectResponse';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherWithSubjectResponse extends TeacherWithContactsResponse {
  @ApiProperty({
    type: SubjectResponse,
  })
    subject: SubjectResponse;
}