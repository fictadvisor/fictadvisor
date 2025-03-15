import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { RoleName } from '../enums';

export class UpdateRoleDTO {
  @ApiPropertyOptional({
    description: 'The name of the role',
    enum: RoleName,
  })
  @IsOptional()
  @IsEnum(RoleName, validationOptionsMsg('Name must be an enum'))
    name?: RoleName;

  @ApiPropertyOptional({
    description: 'The priority or importance of the role',
  })
  @IsOptional()
  @IsNumber({}, validationOptionsMsg('Weight must be a number'))
  @Min(1, validationOptionsMsg('Weight must be more than 1'))
  @Max(5000, validationOptionsMsg('Weight must be less than 5000'))
    weight?: number;

  @ApiPropertyOptional({
    description: 'Brief information about a specific role',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Display name must be a string'))
  @MinLength(3, validationOptionsMsg(('Display name length must be more than 3')))
  @MaxLength(32, validationOptionsMsg('Display name length must be less than 32'))
    displayName?: string;
}
