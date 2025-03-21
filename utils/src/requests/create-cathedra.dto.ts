import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  createRegex,
  UKR_REGEX,
  UKRSPEC_REGEX,
  validationOptionsMsg,
} from '../validation.util';

export class CreateCathedraDTO {
  @ApiPropertyOptional({
    description: 'The name of the cathedra',
  })
  @MinLength(3, validationOptionsMsg('Cathedra name is too short (min: 3)'))
  @MaxLength(150, validationOptionsMsg('Cathedra name is too long (max: 150)'))
  @IsString(validationOptionsMsg('Cathedra name must be string'))
  @IsOptional()
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Cathedra name is incorrect (A-Я(укр.)\\-\' )'),
  )
    name?: string;

  @ApiProperty({
    description: 'The abbreviation of the cathedra',
  })
  @MinLength(1, validationOptionsMsg('Abbreviation is too short (min: 1)'))
  @MaxLength(10, validationOptionsMsg('Abbreviation is too long (max: 10)'))
  @IsNotEmpty(validationOptionsMsg('Abbreviation can not be empty'))
  @IsString(validationOptionsMsg('Abbreviation must be string'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Abbreviation is incorrect (A-Я(укр.)\\-\' )'),
  )
    abbreviation: string;

  @ApiPropertyOptional({
    description: 'The name of the faculty/institute',
  })
  @MinLength(1, validationOptionsMsg('Division name is too short (min: 1)'))
  @MaxLength(10, validationOptionsMsg('Division name is too long (max: 10)'))
  @IsString(validationOptionsMsg('Division must be string'))
  @IsOptional()
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Cathedra name is incorrect (A-Я(укр.)\\-\' )'),
  )
    division?: string;

  @ApiPropertyOptional({
    description: 'Array of teacher ids',
  })
  @IsArray(validationOptionsMsg('Teachers must be an array'))
  @IsOptional()
    teachers?: string[];
}
