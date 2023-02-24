import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ENG_REGEX, NUM_REGEX, validationOptionsMsg } from '../../../utils/GLOBALS';

export class UserDTO {

  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Username is empty'))
    username: string;

  @IsEmail({}, validationOptionsMsg('Email is not email'))
  @IsNotEmpty(validationOptionsMsg('Email is empty'))
    email: string;

  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z$-/:-?{-~!"^_`[\]\d]{8,50}$/,
    validationOptionsMsg('password is not correct or too short (min: 8) or too long (max: 50)'))
  @IsNotEmpty(validationOptionsMsg('password is empty'))
    password: string;
}