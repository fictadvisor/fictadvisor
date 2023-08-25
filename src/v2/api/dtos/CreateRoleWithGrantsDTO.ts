import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleDTO } from './CreateRoleDTO';
import { CreateGrantDTO } from './CreateGrantsDTO';

export class CreateRoleWithGrantsDTO extends CreateRoleDTO {
  @ApiPropertyOptional({
    type: [CreateGrantDTO],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateGrantDTO)
  @IsOptional()
    grants?: CreateGrantDTO[];

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
    parentId?: string;
}