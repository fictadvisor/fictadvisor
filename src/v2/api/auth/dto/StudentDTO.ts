import { IsBoolean, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../../utils/GLOBALS';

export class StudentDTO {
  @IsNotEmpty(validationOptionsMsg('Group id can\'t be empty'))
    groupId: string;

  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('firstName is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('firstName is empty'))
    firstName: string;

  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('middleName is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('middleName is empty'))
  @IsOptional()
    middleName?: string;

  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('lastName is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('lastName is empty'))
    lastName: string;

  @IsBoolean()
  @IsNotEmpty()
    isCaptain: boolean;
}