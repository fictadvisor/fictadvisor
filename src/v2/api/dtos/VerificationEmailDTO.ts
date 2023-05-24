import { IsEmail } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class VerificationEmailDTO {
    @IsEmail({}, validationOptionsMsg('Email is not email'))
      email: string;
}