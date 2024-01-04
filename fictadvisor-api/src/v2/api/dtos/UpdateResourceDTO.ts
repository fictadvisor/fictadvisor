import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateResourceDTO {
  @ApiPropertyOptional()
  @MinLength(3, validationOptionsMsg('Name is too short (min: 3)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
  @IsOptional()
    name?: string;

  @ApiPropertyOptional()
  @IsOptional()
    link?: string;

  @ApiPropertyOptional()
  @IsOptional()
    icon?: string;
}