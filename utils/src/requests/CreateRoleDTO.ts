import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { RoleName } from '../enums';

export class CreateRoleDTO {
  @ApiProperty({
    description: 'The name of role',
    enum: RoleName,
  })
  @IsEnum(RoleName, validationOptionsMsg('Name must be an enum'))
  @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
    name: RoleName;

  @ApiProperty({
    description: 'The priority or importance of the role',
    default: 1,
  })
  @IsNumber({}, validationOptionsMsg('Weight must be a number'))
  @IsNotEmpty(validationOptionsMsg('Weight can not be empty'))
  @Min(1, validationOptionsMsg('Weight must be more than 1'))
  @Max(5000, validationOptionsMsg('Weight must be less than 5000'))
    weight: number;

  @ApiPropertyOptional({
    description: 'Brief information about a specific role',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Display name must be a string'))
  @MinLength(3, validationOptionsMsg(('Display name length must be more than 3')))
  @MaxLength(32, validationOptionsMsg('Display name length must be less than 32'))
    displayName?: string;
}
