import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponse } from './QuestionResponse';
import { TeacherRole } from '../enums/db/TeacherRoleEnum';


class QuestionRole {
  @ApiProperty({
    enum: TeacherRole,
    description: 'An enum of teacher roles',
  })
    role: TeacherRole;

  @ApiProperty({
    description: 'Shows whether the teacher was selected last semester',
  })
    isShown: boolean;

  @ApiProperty({
    description: 'Shows whether roles are required',
  })
    isRequired: boolean;
}

export class QuestionWithRolesResponse extends QuestionResponse {
  @ApiProperty({
    type: [QuestionRole],
    description: 'Array of question roles',
  })
    roles: QuestionRole[];
}
