import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { TeacherRole } from '@prisma/client';
import { ContactResponse } from './ContactResponse';
import { TeacherResponse } from './TeacherResponse';

export class TeacherWithSubjectResponse extends TeacherResponse {
  @ApiProperty({
    description: 'Information about a specific subject',
  })
    subject: SubjectResponse;

  @ApiProperty({
    description: 'Set of teacher roles',
    type: Set<TeacherRole>,
    enum: TeacherRole,
  })
    roles: Set<TeacherRole>;

  @ApiProperty({
    description: 'List of contacts',
    type: [ContactResponse],
  })
    contacts: ContactResponse[];
}