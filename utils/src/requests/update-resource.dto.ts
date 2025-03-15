import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsAscii, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class UpdateResourceDTO {
  @ApiPropertyOptional({
    description: 'Name of specific student resource',
  })
  @MinLength(3, validationOptionsMsg('Name is too short (min: 3)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
  @IsString(validationOptionsMsg('Name must be a string'))
  @IsOptional()
    name?: string;

  @ApiPropertyOptional({
    description: 'Link to specific student resource',
  })
  @IsString(validationOptionsMsg('Link must be a string'))
  @IsAscii(validationOptionsMsg('Link contains wrong symbols (ASCII only)'))
  @IsUrl(undefined, validationOptionsMsg('Link must be a url'))
  @IsOptional()
    link?: string;

  @ApiPropertyOptional({
    description: 'Icon of specific student resource',
  })
  @IsString(validationOptionsMsg('Image link must be a string'))
  @IsAscii(validationOptionsMsg('Image link contains wrong symbols (ASCII only)'))
  @IsUrl(undefined, validationOptionsMsg('Image link must be a url'))
  @IsOptional()
    imageLink?: string;
}
