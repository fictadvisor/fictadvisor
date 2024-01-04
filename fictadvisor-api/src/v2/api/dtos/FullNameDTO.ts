import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  validationOptionsMsg,
} from '../../utils/GLOBALS';

export class FullNameDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('First name can not be empty'))
    firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
    middleName?: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Last name can not be empty'))
    lastName: string;
}