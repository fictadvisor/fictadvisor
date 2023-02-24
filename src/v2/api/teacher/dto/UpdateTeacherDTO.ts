import { IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdateTeacherDTO {
    @MinLength(2, validationOptionsMsg('firstName is too short (min: 2)'))
    @MaxLength(40, validationOptionsMsg('firstName is too long (max: 40)'))
    @Matches(
      createRegex(UKR_REGEX, UKRSPEC_REGEX), validationOptionsMsg('firstName is incorrect (A-Я(укр.)\\-\' )'))
    @IsOptional()
      firstName?: string;

    @MinLength(2, validationOptionsMsg('middleName is too short (min: 2)'))
    @MaxLength(40, validationOptionsMsg('middleName is too long (max: 40)'))
    @Matches(
      createRegex(UKR_REGEX, UKRSPEC_REGEX), validationOptionsMsg('middleName is incorrect (A-Я(укр.)\\-\' )'))
    @IsOptional()
      middleName?: string;

    @MinLength(2, validationOptionsMsg('lastName is too short (min: 2)'))
    @MaxLength(40, validationOptionsMsg('lastName is too long (max: 40)'))
    @Matches(
      createRegex(UKR_REGEX, UKRSPEC_REGEX), validationOptionsMsg('lastName is incorrect (A-Я(укр.)\\-\' )'))
    @IsOptional()
      lastName?: string;

    @MaxLength(400, validationOptionsMsg('description is too long (max: 400)'))
    @IsOptional()
      description?: string;

    @IsOptional()
      avatar?: string;
}