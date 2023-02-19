import { IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { State } from '@prisma/client';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX } from '../../../utils/GLOBALS';

export class UpdateStudentDTO {
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'firstName is not correct (A-Я(укр.)\\-\' )',
    })
  @MinLength(2, {
    message: 'firstName is too short (min 2)',
  })
  @MaxLength(40, {
    message: 'firstName is too long (max 40)',
  })
  @IsOptional()
    firstName?: string;

  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'lastName is not correct (A-Я(укр.)\\-\' )',
    })
  @MinLength(2, {
    message: 'lastName is too short (min 2)',
  })
  @MaxLength(40, {
    message: 'lastName is too long (max 40)',
  })
  @IsOptional()
    lastName?: string;

  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    {
      message: 'middleName is not correct (A-Я(укр.)\\-\' )',
    })
  @MinLength(2, {
    message: 'middleName is too short (min 2)',
  })
  @MaxLength(40, {
    message: 'middleName is too long (max 40)',
  })
  @IsOptional()
    middleName?: string;

  @IsOptional()
    groupId?: string;

  @IsEnum(State, {
    message: 'invalid state argument passed',
  })
    state?: State;
}