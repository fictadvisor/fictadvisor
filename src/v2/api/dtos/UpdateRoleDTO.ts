import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateRoleDTO {
  @ApiPropertyOptional({
    enum: RoleName,
    description: 'Type of a role',
  })
  @IsEnum(RoleName, validationOptionsMsg('Name is not an enum'))
  @IsOptional()
    name?: RoleName;

  @ApiPropertyOptional({
    description: 'Type of a role access',
  })
  @IsNumber({}, validationOptionsMsg('Weight is not a number'))
  @IsOptional()
    weight?: number;
}