import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateQuestionDTO } from './UpdateQuestionDTO';
import { CreateQuestionRoleDTO } from './CreateQuestionRoleDTO';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionWithRolesDTO extends UpdateQuestionDTO {
	@ValidateNested({ each: true })
	@Type(() => CreateQuestionRoleDTO)
	@ApiProperty({
	  type: [CreateQuestionRoleDTO],
	})
	  roles?: CreateQuestionRoleDTO[];
}