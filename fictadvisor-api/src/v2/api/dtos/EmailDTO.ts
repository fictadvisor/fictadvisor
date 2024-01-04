import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsEmail,
} from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDTO {
  @ApiProperty()
  @ArrayMinSize(1, validationOptionsMsg('Email cannot be empty'))
  @ArrayMaxSize(50, validationOptionsMsg('Email cannot be empty'))
  @ArrayUnique({}, validationOptionsMsg('There are duplicate emails'))
  @IsEmail(
    {},
    {
      each: true,
      ...validationOptionsMsg('The email is not a valid email address'),
    }
  )
    emails: string[];
}
