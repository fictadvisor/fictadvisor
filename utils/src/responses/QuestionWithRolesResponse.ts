import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '../enums';
import { QuestionWithCategoryResponse } from './QuestionResponse';

class QuestionRole {
  @ApiProperty({
    enum: DisciplineTypeEnum,
    description: 'An enum of teacher roles',
  })
    role: DisciplineTypeEnum;

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
