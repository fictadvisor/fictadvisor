import {
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createRegex, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';

class Entrant {
  @ApiProperty()
  @MinLength(2, validationOptionsMsg('First name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('First name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('First name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('First name is incorrect (A-Я(укр.)\\-\' )'),
  )
    firstName: string;

  @ApiPropertyOptional()
  @MinLength(2, validationOptionsMsg('Middle name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Middle name is too long (max: 40)'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Middle name is incorrect (A-Я(укр.)\\-\' )'),
  )
  @IsOptional()
    middleName?: string;

  @ApiProperty()
  @MinLength(2, validationOptionsMsg('Last name is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Last name is too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Last name can not be empty'))
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Last name is incorrect (A-Я(укр.)\\-\' )'),
  )
    lastName: string;
}

class Contract {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Number can not be empty'))
    number: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Date can not be empty'))
    date: string;
}

export class CreateContractDTO {
  @ApiProperty({
    type: Entrant,
  })
  @ValidateNested()
  @IsNotEmpty(validationOptionsMsg('Entrant can not be empty'))
  @Type(() => Entrant)
    entrant: Entrant;

  @ApiProperty({
    type: Contract,
  })
  @ValidateNested()
  @IsNotEmpty(validationOptionsMsg('Contract can not be empty'))
  @Type(() => Contract)
    contract: Contract;
}