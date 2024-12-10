import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import {
  UKR_REGEX,
  UKRSPEC_REGEX,
  validationOptionsMsg,
} from '../ValidationUtil';

export class StudentDTO {
  @ApiProperty({
    description: 'Id of the group',
  })
  @IsUUID(undefined, validationOptionsMsg('Group id must be UUID'))
  @IsNotEmpty(validationOptionsMsg('Group id cannot be empty'))
  @IsString(validationOptionsMsg('Group id must be string'))
    groupId: string;

  @ApiProperty({
    description: 'Student\'s name',
  })
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('First name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('First name cannot be empty'))
  @IsString(validationOptionsMsg('First name must be string'))
    firstName: string;

  @ApiPropertyOptional({
    description: 'Student\'s middle name',
  })
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{0,40}$'),
    validationOptionsMsg('Middle name is not correct (A-Я(укр.)\\-\' ), or too long (max: 40)'))
  @IsString(validationOptionsMsg('Middle name must be string'))
  @IsOptional()
    middleName?: string;

  @ApiProperty({
    description: 'Student\'s surname',
  })
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    validationOptionsMsg('Last name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Last name cannot be empty'))
  @IsString(validationOptionsMsg('Last name must be string'))
    lastName: string;

  @ApiProperty({
    description: 'Whether the student is the head of the group or not',
  })
  @IsBoolean(validationOptionsMsg('isCaptain must be a boolean'))
  @IsNotEmpty(validationOptionsMsg('isCaptain cannot be empty'))
    isCaptain: boolean;
}
