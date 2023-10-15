import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleDTO } from './CreateRoleDTO';
import { CreateGrantDTO } from './CreateGrantsDTO';

export class CreateRoleWithGrantsDTO extends CreateRoleDTO {
  @ApiPropertyOptional({
    type: [CreateGrantDTO],
    description: 'List of permissions for roles',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateGrantDTO)
  @IsOptional()
    grants?: CreateGrantDTO[];

  @ApiPropertyOptional({ description: 'Id of a parent permission' })
  @IsUUID()
  @IsOptional()
    parentId?: string;
}