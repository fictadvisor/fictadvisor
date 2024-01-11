import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionRoleDTO } from '../dtos/CreateQuestionRoleDTO';
import { QuestionResponse } from './QuestionResponse';

export class QuestionWithRolesResponse extends QuestionResponse {
  @ApiProperty({
    type: [CreateQuestionRoleDTO],
    description: 'Array of question roles',
  })
    roles: CreateQuestionRoleDTO[];
}
