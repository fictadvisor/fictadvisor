import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateRoleDTO {
  @ApiPropertyOptional({
    enum: RoleName,
  })
  @IsEnum(RoleName, validationOptionsMsg('Name is not an enum'))
  @IsOptional()
    name?: RoleName;

  @ApiPropertyOptional()
  @IsNumber({}, validationOptionsMsg('Weight is not a number'))
  @IsOptional()
    weight?: number;
}