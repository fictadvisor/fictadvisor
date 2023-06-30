import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionRoleDTO } from '../dtos/CreateQuestionRoleDTO';
import { QuestionResponse } from './QuestionResponse';

export class QuestionWithRolesResponse extends QuestionResponse {
  @ApiProperty()
    order: number;

  @ApiProperty({
    type: [CreateQuestionRoleDTO],
  })
    roles: CreateQuestionRoleDTO[];
}