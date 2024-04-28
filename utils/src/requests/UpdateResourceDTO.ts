import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class UpdateResourceDTO {
  @ApiPropertyOptional({
    description: 'Name of specific student resource',
  })
  @MinLength(3, validationOptionsMsg('Name is too short (min: 3)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
  @IsOptional()
    name?: string;

  @ApiPropertyOptional({
    description: 'Link to specific student resource',
  })
  @IsOptional()
    link?: string;

  @ApiPropertyOptional({
    description: 'Icon of specific student resource',
  })
  @IsOptional()
    imageLink?: string;
}