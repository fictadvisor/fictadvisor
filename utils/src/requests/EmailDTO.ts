import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsEmail, IsNotEmpty,
} from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class EmailDTO {
  @ApiProperty({
    description: 'Emails for adding students to group',
  })
  @ArrayMinSize(1, validationOptionsMsg('Array of emails is too short (min: 1)'))
  @ArrayMaxSize(50, validationOptionsMsg('Array of emails is too long (max: 50)'))
  @ArrayUnique({}, validationOptionsMsg('There are duplicate emails'))
  @IsEmail(
    {},
    validationOptionsMsg('The email is not a valid email address', true),
  )
  @IsNotEmpty(validationOptionsMsg('Emails cannot be empty'))
    emails: string[];
}
