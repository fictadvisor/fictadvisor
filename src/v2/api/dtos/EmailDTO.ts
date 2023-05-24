import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsEmail } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class EmailDTO {
    @ArrayMinSize(1, validationOptionsMsg('Email can not be empty'))
    @ArrayMaxSize(50, validationOptionsMsg('Email can not be empty'))
    @ArrayUnique({}, validationOptionsMsg('There are duplicate emails'))
    @IsEmail({}, {
      each: true,
      ...validationOptionsMsg('One of emails is not an email'),
    })
      emails: string[];
}