import { IsEmail, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class ForgotPasswordDTO {
  @IsEmail({}, validationOptionsMsg('Email is not email'))
  @IsNotEmpty(validationOptionsMsg('Email is empty'))
    email: string;
}