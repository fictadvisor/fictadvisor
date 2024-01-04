import { IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeacherDTO {
  @ApiPropertyOptional()
  @MinLength(2, validationOptionsMsg('First name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('First name is too long (max: 40)'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('First name is incorrect (A-Я(укр.)\\-\' )'),
  )
  @IsOptional()
    firstName?: string;

  @ApiPropertyOptional()
  @MinLength(2, validationOptionsMsg('Middle name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Middle name is too long (max: 40)'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Middle name is incorrect (A-Я(укр.)\\-\' )'),
  )
  @IsOptional()
    middleName?: string;

  @ApiPropertyOptional()
  @MinLength(2, validationOptionsMsg('Last name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Last name is too long (max: 40)'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Last name is incorrect (A-Я(укр.)\\-\' )'),
  )
  @IsOptional()
    lastName?: string;

  @ApiPropertyOptional()
  @MaxLength(400, validationOptionsMsg('Description is too long (max: 400)'))
  @IsOptional()
    description?: string;

  @ApiPropertyOptional()
  @IsOptional()
    avatar?: string;
}