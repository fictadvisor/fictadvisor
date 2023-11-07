import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class CreateRoleDTO {
  @ApiProperty({
    description: 'The name of role',
    enum: RoleName,
  })
  @IsEnum(RoleName, validationOptionsMsg('Name is not an enum'))
  @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
    name: RoleName;

  @ApiProperty({
    description: 'The priority or importance of the role',
    default: 1,
  })
  @IsNumber({}, validationOptionsMsg('Weight is not a number'))
  @IsNotEmpty(validationOptionsMsg('Weight can not be empty'))
    weight: number;

  @ApiPropertyOptional({
    description: 'Brief information about a specific role',
  })
  @IsOptional()
    displayName?: string;
}