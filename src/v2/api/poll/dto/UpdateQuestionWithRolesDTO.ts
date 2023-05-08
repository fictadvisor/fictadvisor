import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateQuestionDTO } from './UpdateQuestionDTO';
import { CreateQuestionRoleDTO } from './CreateQuestionRoleDTO';

export class UpdateQuestionWithRolesDTO extends UpdateQuestionDTO {
	@ValidateNested({ each: true })
	@Type(() => CreateQuestionRoleDTO)
	 roles?: CreateQuestionRoleDTO[];
}