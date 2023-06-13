import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionRoleDTO } from './CreateQuestionRoleDTO';
import { CreateQuestionDTO } from './CreateQuestionDTO';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionWithRolesDTO extends CreateQuestionDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionRoleDTO)
    @ApiProperty({
      type: [CreateQuestionRoleDTO],
    })
    roles: CreateQuestionRoleDTO[];
}