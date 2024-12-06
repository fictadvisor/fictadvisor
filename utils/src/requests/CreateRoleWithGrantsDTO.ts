import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleDTO } from './CreateRoleDTO';
import { CreateGrantDTO } from './CreateGrantDTO';
import { validationOptionsMsg } from '../ValidationUtil';

export class CreateRoleWithGrantsDTO extends CreateRoleDTO {
  @ApiPropertyOptional({
    description: 'A list of permissions granted to a role',
    type: [CreateGrantDTO],
  })
  @ValidateNested(validationOptionsMsg('Grants must be an array of CreateGrantDTO', true))
  @Type(() => CreateGrantDTO)
  @IsOptional()
    grants?: CreateGrantDTO[];

  @ApiPropertyOptional({
    description: 'The id of the parent',
  })
  @IsUUID(undefined, validationOptionsMsg('Parent id must be a UUID'))
  @IsOptional()
    parentId?: string;
}
