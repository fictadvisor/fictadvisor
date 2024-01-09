import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
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
  @Min(1, validationOptionsMsg('Weight must be more than 0'))
  @Max(5000, validationOptionsMsg('Weight must be less than 5000'))
    weight: number;

  @ApiProperty({
    description: 'Brief information about a specific role',
  })
  @MinLength(3, validationOptionsMsg(('Display name length must be more than 3')))
  @MaxLength(32, validationOptionsMsg('Display name length must be less than 32'))
    displayName: string;
}