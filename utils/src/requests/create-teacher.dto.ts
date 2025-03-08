import { IsEnum, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AcademicStatus, Position, ScientificDegree } from '../enums';
import {
  createRegex,
  UKR_REGEX,
  UKRSPEC_REGEX,
  validationOptionsMsg,
} from '../validation.util';

export class CreateTeacherDTO {
  @ApiProperty({
    description: 'Teacher`s first name',
  })
  @MinLength(2, validationOptionsMsg('First name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('First name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('First name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('First name is incorrect (A-Я(укр.)\\-\' )'),
  )
    firstName: string;

  @ApiPropertyOptional({
    description: 'Teacher`s middle name',
  })
  @MinLength(2, validationOptionsMsg('Middle name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Middle name is too long (max: 40)'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Middle name is incorrect (A-Я(укр.)\\-\' )'),
  )
  @IsOptional()
    middleName?: string;

  @ApiProperty({
    description: 'Teacher`s last name',
  })
  @MinLength(2, validationOptionsMsg('Last name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Last name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Last name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Last name is incorrect (A-Я(укр.)\\-\' )'),
  )
    lastName: string;

  @ApiPropertyOptional({
    description: 'Teacher`s description',
  })
  @MaxLength(400, validationOptionsMsg('Description is too long (max: 400)'))
  @IsOptional()
    description?: string;

  @ApiPropertyOptional({
    description: 'Teacher`s avatar',
  })
  @IsOptional()
    avatar?: string;

  @ApiProperty({
    description: 'Academic status of the teacher',
    enum: AcademicStatus,
  })
  @IsEnum(AcademicStatus, validationOptionsMsg('Academic status must be enum'))
  @IsNotEmpty(validationOptionsMsg('Academic status cannot be empty'))
    academicStatus: AcademicStatus;

  @ApiProperty({
    description: 'Scientific degree of the teacher',
    enum: ScientificDegree,
  })
  @IsEnum(ScientificDegree, validationOptionsMsg('Scientific degree must be an enum'))
  @IsNotEmpty(validationOptionsMsg('Scientific degree can not be empty'))
    scientificDegree: ScientificDegree;

  @ApiProperty({
    description: 'Position of the teacher',
    enum: Position,
  })
  @IsEnum(Position, validationOptionsMsg('Position must be an enum'))
  @IsNotEmpty(validationOptionsMsg('Position cannot be empty'))
    position: Position;
}
