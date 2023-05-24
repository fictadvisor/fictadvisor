import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleDTO } from './CreateRoleDTO';
import { CreateGrantDTO } from './CreateGrantsDTO';

export class CreateRoleWithGrantsDTO extends CreateRoleDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateGrantDTO)
  @IsOptional()
    grants?: CreateGrantDTO[];
}