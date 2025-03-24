import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionRoleDTO } from './create-question-role.dto';
import { CreateQuestionDTO } from './create-question.dto';

export class CreateQuestionWithRolesDTO extends CreateQuestionDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionRoleDTO)
    @ApiProperty({
      type: [CreateQuestionRoleDTO],
      description: 'An array with information about the roles associated with this question',
    })
    roles: CreateQuestionRoleDTO[];
}
