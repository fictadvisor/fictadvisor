import { StudyFormParam, StudyTypeParam } from './StudyContractParams';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';

class MetaContractDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Speciality cannot be empty'))
    speciality: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Study type cannot be empty'))
    studyType: StudyTypeParam;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Study form cannot be empty'))
    studyForm: StudyFormParam;
  
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('isToAdmission cannot be empty'))
    isToAdmission: boolean;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('isForcePushed cannot be empty'))
    isForcePushed: boolean;
}

export class PersonalDataDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('First name can not be empty'))
    firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
    middleName?: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Last name can not be empty'))
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
  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
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