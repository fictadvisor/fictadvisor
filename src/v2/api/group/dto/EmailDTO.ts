import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class EmailDTO {
    @MinLength(1, validationOptionsMsg('Code can\'t be empty'))
    @MaxLength(50, validationOptionsMsg('Code can\'t be empty'))
    @IsEmail({}, {
      each: true,
      message: 'one of emails is not email',
    })
      emails: string[];
}