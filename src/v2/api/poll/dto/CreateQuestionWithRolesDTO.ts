import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionRoleDTO } from './CreateQuestionRoleDTO';
import { CreateQuestionDTO } from './CreateQuestionDTO';

export class CreateQuestionWithRolesDTO extends CreateQuestionDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionRoleDTO)
    roles: CreateQuestionRoleDTO[];
}