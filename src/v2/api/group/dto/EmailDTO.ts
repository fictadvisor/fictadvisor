import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class EmailDTO {
    @MinLength(1, validationOptionsMsg('Email can not be empty'))
    @MaxLength(50, validationOptionsMsg('Email can not be empty'))
    @IsEmail({}, {
      each: true,
      ...validationOptionsMsg('One of emails is not an email'),
    })
      emails: string[];
}