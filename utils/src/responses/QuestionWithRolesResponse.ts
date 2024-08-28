import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponse } from './QuestionResponse';
import { DisciplineTypeEnum } from '../enums';


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

export class QuestionWithRolesResponse extends QuestionResponse {
  @ApiProperty({
    type: [QuestionRole],
    description: 'Array of question roles',
  })
    roles: QuestionRole[];
}
