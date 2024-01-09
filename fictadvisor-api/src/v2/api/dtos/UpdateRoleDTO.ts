import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
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
  @Min(1, validationOptionsMsg('Weight must be more than 0'))
  @Max(5000, validationOptionsMsg('Weight must be less than 5000'))
    weight?: number;

  @ApiPropertyOptional({
    description: 'Brief information about a specific role',
  })
  @MinLength(3, validationOptionsMsg(('Display name length must be more than 3')))
  @MaxLength(32, validationOptionsMsg('Display name length must be less than 32'))
    displayName?: string;
}