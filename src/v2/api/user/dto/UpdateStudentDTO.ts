import { IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { State } from '@prisma/client';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdateStudentDTO {
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX), validationOptionsMsg('firstName is not correct (A-Я(укр.)\\-\' )'))
  @MinLength(2, validationOptionsMsg('firstName is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('firstName is too long (max 40)'))
  @IsOptional()
    firstName?: string;

  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'lastName is not correct (A-Я(укр.)\\-\' )',
    })
  @MinLength(2, validationOptionsMsg('lastName is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('lastName is too long (max 40)'))
  @IsOptional()
    lastName?: string;

  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX), validationOptionsMsg('middleName is not correct (A-Я(укр.)\\-\' )'))
  @MinLength(2, validationOptionsMsg('middleName is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('middleName is too long (max 40)'))
  @IsOptional()
    middleName?: string;

  @IsOptional()
    groupId?: string;

  @IsEnum(State, validationOptionsMsg('invalid state argument passed'))
    state?: State;
}