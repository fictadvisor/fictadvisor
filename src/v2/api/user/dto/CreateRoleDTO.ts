import { RoleName } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoleDTO {
  @IsEnum(RoleName)
  @IsNotEmpty()
    name: RoleName;

  @IsNumber()
  @IsNotEmpty()
    weight: number;
}

export class CreateRoleData {
  name: RoleName;
  weight: number;
}

export class CreateRoleWithGrantsDTO extends CreateRoleDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateGrantDTO)
  @IsOptional()
    grants?: CreateGrantDTO[];
}

export class CreateGrantDTO {
  @IsNotEmpty()
    permission: string;

  @IsBoolean()
  @IsOptional()
    set?: boolean;
}

export class CreateGrantInRoleData {
  permission: string;
  set?: boolean;
}

export class CreateGrantData extends CreateGrantInRoleData {
  roleId: string;
}

export class CreateGrantsDTO {
  grants: CreateGrantDTO[];
}