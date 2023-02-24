import { IsEmail } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class VerificateEmailDTO {
    @IsEmail({}, validationOptionsMsg('Email is not email'))
      email: string;
}