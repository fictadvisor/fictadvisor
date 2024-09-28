import { ApiProperty } from '@nestjs/swagger';
import { QuestionWithCategoryResponse } from './QuestionResponse';
import { TeacherRole } from '../enums';

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

export class QuestionWithCategoriesAndRolesResponse extends QuestionWithCategoryResponse {
  @ApiProperty({
    type: [QuestionRole],
    description: 'Array of question roles',
  })
    roles: QuestionRole[];
}
