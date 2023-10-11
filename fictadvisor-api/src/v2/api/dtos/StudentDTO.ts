import { IsBoolean, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentDTO {
  @ApiProperty({
    description: 'Id of the group',
  })
  @IsNotEmpty(validationOptionsMsg('Group id cannot be empty'))
    groupId: string;

  @ApiProperty({
    description: 'Student\'s name',
  })
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('First name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('First name cannot be empty'))
    firstName: string;

  @ApiPropertyOptional({
    description: 'Student\'s middle name',
  })
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{0,40}$'),
    validationOptionsMsg('Middle name is not correct (A-Я(укр.)\\-\' ), or too long (max: 40)'))
  @IsOptional()
    middleName?: string;

  @ApiProperty({
    description: 'Student\'s surname',
  })
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('Last name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Last name cannot be empty'))
    lastName: string;

  @ApiProperty({
    description: 'Whether the student is the head of the group or not',
  })
  @IsBoolean(validationOptionsMsg('isCaptain must be a boolean'))
  @IsNotEmpty(validationOptionsMsg('isCaptain cannot be empty'))
    isCaptain: boolean;
}