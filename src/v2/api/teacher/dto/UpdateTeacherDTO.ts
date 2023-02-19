import { IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX } from '../../../utils/GLOBALS';

export class UpdateTeacherDTO {
    @MinLength(2, {
      message: 'firstName is too short (min: 2)',
    })
    @MaxLength(40, {
      message: 'firstName is too long (max: 40)',
    })
    @Matches(
      createRegex(UKR_REGEX, UKRSPEC_REGEX),
      {
        message: 'firstName is incorrect (A-Я(укр.)\\-\' )',
      }
    )
    @IsOptional()
      firstName?: string;

    @MinLength(2, {
      message: 'middleName is too short (min: 2)',
    })
    @MaxLength(40, {
      message: 'middleName is too long (max: 40)',
    })
    @Matches(
      createRegex(UKR_REGEX, UKRSPEC_REGEX),
      {
        message: 'middleName is incorrect (A-Я(укр.)\\-\' )',
      }
    )
    @IsOptional()
      middleName?: string;

    @MinLength(2, {
      message: 'lastName is too short (min: 2)',
    })
    @MaxLength(40, {
      message: 'lastName is too long (max: 40)',
    })
    @Matches(
      createRegex(UKR_REGEX, UKRSPEC_REGEX),
      {
        message: 'lastName is incorrect (A-Я(укр.)\\-\' )',
      }
    )
    @IsOptional()
      lastName?: string;

    @MaxLength(400, {
      message: 'description is too long (max: 400)',
    })
    @IsOptional()
      description?: string;

    @IsOptional()
      avatar?: string;
}