import { RoleName } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateRoleDTO {
  @IsOptional()
    name?: RoleName;

  @IsOptional()
    weight?: number;
}