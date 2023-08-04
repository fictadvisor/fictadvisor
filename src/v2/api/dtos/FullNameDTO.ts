import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import {
  ADMISSION_UKRSPEC_REGEX,
  createRegex,
  UKR_REGEX,
  validationOptionsMsg,
} from '../../utils/GLOBALS';

export class FullNameDTO {
  @ApiProperty()
  @MinLength(2, validationOptionsMsg('First name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('First name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('First name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, ADMISSION_UKRSPEC_REGEX),
    validationOptionsMsg('First name is incorrect (A-Я(укр.)\\-` )'),
  )
    firstName: string;

  @ApiPropertyOptional()
  @MinLength(2, validationOptionsMsg('Middle name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Middle name is too long (max: 40)'))
  @Matches(
    createRegex(UKR_REGEX, ADMISSION_UKRSPEC_REGEX),
    validationOptionsMsg('Middle name is incorrect (A-Я(укр.)\\-` )'),
  )
  @IsOptional()
    middleName?: string;

  @ApiProperty()
  @MinLength(2, validationOptionsMsg('Last name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Last name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Last name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, ADMISSION_UKRSPEC_REGEX),
    validationOptionsMsg('Last name is incorrect (A-Я(укр.)\\-` )'),
  )
    lastName: string;
}