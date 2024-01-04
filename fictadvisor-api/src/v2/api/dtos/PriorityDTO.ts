import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import {
  validationOptionsMsg,
} from '../../utils/GLOBALS';
import { EducationProgram } from '@prisma/client';
import { Type } from 'class-transformer';

class PriorityListDTO {
  @ApiPropertyOptional()
  @IsOptional()
    1?: EducationProgram;

  @ApiPropertyOptional()
  @IsOptional()
    2?: EducationProgram;

  @ApiPropertyOptional()
  @IsOptional()
    3?: EducationProgram;
}

export class PriorityDTO {
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
  @IsNotEmpty(validationOptionsMsg('Specialty can not be empty'))
    specialty: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Email can not be empty'))
    email: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Day cannot be empty'))
    day: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('isToAdmission cannot be empty'))
    isToAdmission: boolean;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PriorityListDTO)
    priorities: PriorityListDTO;

  @ApiPropertyOptional()
  @IsOptional()
    isForcePushed: boolean;
}
