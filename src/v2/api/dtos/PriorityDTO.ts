import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  ADMISSION_UKRSPEC_REGEX,
  createRegex,
  UKR_REGEX,
  validationOptionsMsg,
} from '../../utils/GLOBALS';
import { EducationProgram } from '@prisma/client';
import { Type } from 'class-transformer';

class PriorityListDTO {
  @ApiProperty()
  @IsEnum(EducationProgram, validationOptionsMsg('1st priority must be an enum'))
  @IsNotEmpty(validationOptionsMsg('1st priority cannot be empty'))
    1: EducationProgram;

  @ApiProperty()
  @IsEnum(EducationProgram, validationOptionsMsg('2nd priority must be an enum'))
  @IsNotEmpty(validationOptionsMsg('2nd priority cannot be empty'))
    2: EducationProgram;

  @ApiProperty()
  @IsEnum(EducationProgram, validationOptionsMsg('3rd priority must be an enum'))
  @IsOptional()
    3?: EducationProgram;
}

export class PriorityDTO {
  @ApiProperty()
  @MinLength(2, validationOptionsMsg('First name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('First name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('First name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, ADMISSION_UKRSPEC_REGEX),
    validationOptionsMsg('First name is incorrect (A-Я(укр.)\\-` )'),
  )
    firstName: string;

  @ApiPropertyOptional()
  @MinLength(2, validationOptionsMsg('Middle name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Middle name is too long (max: 40)'))
  @Matches(
    createRegex(UKR_REGEX, ADMISSION_UKRSPEC_REGEX),
    validationOptionsMsg('Middle name is incorrect (A-Я(укр.)\\-` )'),
  )
  @IsOptional()
    middleName?: string;

  @ApiProperty()
  @MinLength(2, validationOptionsMsg('Last name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Last name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Last name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, ADMISSION_UKRSPEC_REGEX),
    validationOptionsMsg('Last name is incorrect (A-Я(укр.)\\-` )'),
  )
    lastName: string;

  @ApiProperty()
  @IsIn(['121', '126'], validationOptionsMsg('The specialty code is not valid'))
    specialty: string;

  @ApiProperty()
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  @IsNotEmpty(validationOptionsMsg('Email is empty'))
    email: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Day cannot be empty'))
    day: string;

  @ApiProperty()
  @IsBoolean(validationOptionsMsg('isToAdmission form must be boolean'))
  @IsNotEmpty(validationOptionsMsg('isToAdmission cannot be empty'))
    isToAdmission: boolean;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PriorityListDTO)
    priorities: PriorityListDTO;
}
