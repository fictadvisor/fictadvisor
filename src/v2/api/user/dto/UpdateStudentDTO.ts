import { IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { State } from '@prisma/client';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdateStudentDTO {
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('First name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MinLength(2, validationOptionsMsg('First name is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('First name is too long (max 40)'))
  @IsOptional()
    firstName?: string;

  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Last name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MinLength(2, validationOptionsMsg('Last name is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('Last name is too long (max 40)'))
  @IsOptional()
    lastName?: string;

  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Middle name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MinLength(2, validationOptionsMsg('Middle name is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('Middle name is too long (max 40)'))
  @IsOptional()
    middleName?: string;

  @IsOptional()
    groupId?: string;

  @IsEnum(State, validationOptionsMsg('State is not an enum'))
  @IsOptional()
    state?: State;
}