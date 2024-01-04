import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateRoleDTO {
  @ApiPropertyOptional({
    description: 'The name of the role',
    enum: RoleName,
  })
  @IsEnum(RoleName, validationOptionsMsg('Name is not an enum'))
  @IsOptional()
    name?: RoleName;

  @ApiPropertyOptional({
    description: 'The priority or importance of the role',
  })
  @IsNumber({}, validationOptionsMsg('Weight is not a number'))
  @IsOptional()
    weight?: number;

  @ApiPropertyOptional({
    description: 'Brief information about a specific role',
  })
  @IsOptional()
    displayName?: string;
}