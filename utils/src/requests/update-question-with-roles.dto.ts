import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateQuestionDTO } from './update-question.dto';
import { CreateQuestionRoleDTO } from './create-question-role.dto';

export class UpdateQuestionWithRolesDTO extends UpdateQuestionDTO {
	@ValidateNested({ each: true })
	@Type(() => CreateQuestionRoleDTO)
	@ApiProperty({
	  type: [CreateQuestionRoleDTO],
	  description: 'Id of question with role to update',
	})
	  roles?: CreateQuestionRoleDTO[];
}
