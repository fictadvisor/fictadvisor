import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleDTO } from './CreateRoleDTO';
import { CreateGrantDTO } from './CreateGrantsDTO';

export class CreateRoleWithGrantsDTO extends CreateRoleDTO {
  @ApiPropertyOptional({
    description: 'A list of permissions granted to a role',
    type: [CreateGrantDTO],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateGrantDTO)
  @IsOptional()
    grants?: CreateGrantDTO[];

  @ApiPropertyOptional({
    description: 'The id of the parent',
  })
  @IsUUID()
  @IsOptional()
    parentId?: string;

  @ApiPropertyOptional({
    description: 'Brief information about a specific role',
  })
  @IsOptional()
    displayName?: string;
}