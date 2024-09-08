import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsEmail,
} from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class EmailDTO {
  @ApiProperty({
    description: 'Emails for adding students to group',
  })
  @ArrayMinSize(1, validationOptionsMsg('Email cannot be empty'))
  @ArrayMaxSize(50, validationOptionsMsg('Email cannot be empty'))
  @ArrayUnique({}, validationOptionsMsg('There are duplicate emails'))
  @IsEmail(
    {},
    validationOptionsMsg('The email is not a valid email address', true),
  )
    emails: string[];
}
