import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateCathedraDTO {
  @ApiPropertyOptional({
    description: 'The updated name of the cathedra',
  })
  @IsOptional()
  @MinLength(3, validationOptionsMsg('Cathedra name is too short (min: 3)'))
  @MaxLength(150, validationOptionsMsg('Cathedra name is too long (max: 150)'))
  @IsNotEmpty(validationOptionsMsg('Cathedra name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Cathedra name is incorrect (A-Я(укр.)\\-\' )'),
  )
    name?: string;

  @ApiPropertyOptional({
    description: 'The updated abbreviation of the cathedra',
  })
  @IsOptional()
  @MinLength(1, validationOptionsMsg('Abbreviation is too short (min: 1)'))
  @MaxLength(10, validationOptionsMsg('Abbreviation is too long (max: 10)'))
  @IsNotEmpty(validationOptionsMsg('Abbreviation can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Abbreviation is incorrect (A-Я(укр.)\\-\' )'),
  )
    abbreviation?: string;

  @ApiPropertyOptional({
    description: 'The name of the faculty/institute',
  })
  @MinLength(1, validationOptionsMsg('Division name is too short (min: 1)'))
  @MaxLength(10, validationOptionsMsg('Division name is too long (max: 10)'))
  @IsOptional()
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Division name is incorrect (A-Я(укр.)\\-\' )'),
  )
    division?: string;

  @ApiPropertyOptional({
    description: 'Array of teacher ids to delete',
  })
  @IsArray(validationOptionsMsg('Teachers to delete must be an array'))
  @IsOptional()
    deleteTeachers?: string[];

  @ApiPropertyOptional({
    description: 'Array of teacher ids to add',
  })
  @IsArray(validationOptionsMsg('Teachers to add must be an array'))
  @IsOptional()
    addTeachers?: string[];
}
