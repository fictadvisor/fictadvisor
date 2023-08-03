import { PaymentTypeParam, StudyFormParam, StudyTypeParam } from './StudyContractParams';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty, IsOptional,
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
import { Type } from 'class-transformer';

class MetaContractDTO {
  @ApiProperty()
  @IsIn(['121', '123', '126'], validationOptionsMsg('The specialty code is not valid'))
    speciality: string;

  @ApiProperty()
  @IsEnum(StudyTypeParam, validationOptionsMsg('Study type must be an enum'))
  @IsNotEmpty(validationOptionsMsg('Study type cannot be empty'))
    studyType: StudyTypeParam;

  @ApiProperty()
  @IsEnum(StudyFormParam, validationOptionsMsg('Study form must be an enum'))
  @IsNotEmpty(validationOptionsMsg('Study form cannot be empty'))
    studyForm: StudyFormParam;

  @ApiPropertyOptional()
  @IsEnum(PaymentTypeParam, validationOptionsMsg('Payment type must be an enum'))
  @IsOptional()
    paymentType?: PaymentTypeParam;

  @ApiProperty()
  @IsBoolean(validationOptionsMsg('isToAdmission form must be boolean'))
  @IsNotEmpty(validationOptionsMsg('isToAdmission cannot be empty'))
    isToAdmission: boolean;
}

export class PersonalDataDTO {
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

  @ApiPropertyOptional()
  @IsOptional()
    passportSeries?: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Passport number can not be empty'))
    passportNumber: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Passport Institute can not be empty'))
    passportInstitute: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Passport date cannot be empty'))
    passportDate: string;

  @ApiPropertyOptional()
  @IsOptional()
    region?: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Settlement cannot be empty'))
    settlement: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Address cannot be empty'))
    address: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Index cannot be empty'))
    index: string;

  @ApiPropertyOptional()
  @IsOptional()
    idCode?: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Phone number cannot be empty'))
    phoneNumber: string;

  @ApiProperty()
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  @IsNotEmpty(validationOptionsMsg('Email is empty'))
    email: string;
}

export class StudyContractDTO {
  @ApiProperty()
  @ValidateNested()
  @Type(() => PersonalDataDTO)
    entrant: PersonalDataDTO;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => PersonalDataDTO)
    representative?: PersonalDataDTO;

  @ApiProperty()
  @ValidateNested()
  @Type(() => MetaContractDTO)
    meta: MetaContractDTO;
}