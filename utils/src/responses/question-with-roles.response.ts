import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '../enums';
import { QuestionWithCategoryResponse } from './question.response';
import { AutoMap } from '@automapper/classes';

export class QuestionRole {
  @ApiProperty({
    enum: DisciplineTypeEnum,
    description: 'An enum of teacher roles',
  })
  @AutoMap(() => String)
    role: DisciplineTypeEnum;

  @ApiProperty({
    description: 'Shows whether the teacher was selected last semester',
  })
  @AutoMap()
    isShown: boolean;

  @ApiProperty({
    description: 'Shows whether roles are required',
  })
  @AutoMap()
    isRequired: boolean;
}

export class QuestionWithCategoriesAndRolesResponse extends QuestionWithCategoryResponse {
  @ApiProperty({
    type: [QuestionRole],
    description: 'Array of question roles',
  })
  @AutoMap(() => [QuestionRole])
    roles: QuestionRole[];
}
