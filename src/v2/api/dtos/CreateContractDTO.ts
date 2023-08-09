import {
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';

export class Entrant {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('First name can not be empty'))
    firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
    middleName?: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Last name can not be empty'))
    lastName: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Last name can not be empty'))
    specialty: string;
}

export class Contract {
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

  @ApiPropertyOptional()
  @IsOptional()
    isForcePushed: boolean;
}