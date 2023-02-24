import { IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../../utils/GLOBALS';

export class CreateTeacherDTO {
  @MinLength(2, validationOptionsMsg('firstName is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('firstName is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('firstName can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'firstName is incorrect (A-Я(укр.)\\-\' )',
    }
  )
    firstName: string;

  @MinLength(2, validationOptionsMsg('middleName is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('middleName is too long (max: 40)'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'middleName is incorrect (A-Я(укр.)\\-\' )',
    }
  )
  @IsOptional()
    middleName?: string;

  @MinLength(2, validationOptionsMsg('lastName is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('lastName is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('lastName can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'lastName is incorrect (A-Я(укр.)\\-\' )',
    }
  )
    lastName: string;

  @MaxLength(400, validationOptionsMsg('description is too long (max: 400)'))
  @IsOptional()
    description?: string;

  @IsOptional()
    avatar?: string;
}