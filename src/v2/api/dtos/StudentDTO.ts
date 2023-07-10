import { IsBoolean, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Group id can not be empty'))
    groupId: string;

  @ApiProperty()
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('First name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('First name is empty'))
    firstName: string;

  @ApiPropertyOptional()
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{0,40}$'),
    validationOptionsMsg('Middle name is not correct (A-Я(укр.)\\-\' ), or too long (max: 40)'))
  @IsOptional()
    middleName?: string;

  @ApiProperty()
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('Last name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Last name is empty'))
    lastName: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
    isCaptain: boolean;
}