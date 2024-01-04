import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateCathedraDTO {
  @ApiPropertyOptional({
    description: 'The updated name of the cathedra',
  })
  @IsOptional()
  @MinLength(5, validationOptionsMsg('Cathedra name is too short (min: 5)'))
  @MaxLength(40, validationOptionsMsg('Cathedra name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Cathedra name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Cathedra name is incorrect (A-Я(укр.)\\-\' )'),
  )
    name?: string;

  @ApiPropertyOptional({
    description: 'The updated abbreviation of the cathedra',
  })
  @IsOptional()
  @MinLength(2, validationOptionsMsg('Abbreviation is too short (min: 2)'))
  @MaxLength(6, validationOptionsMsg('Abbreviation is too long (max: 6)'))
  @IsNotEmpty(validationOptionsMsg('Abbreviation can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Abbreviation is incorrect (A-Я(укр.)\\-\' )'),
  )
    abbreviation?: string;
}