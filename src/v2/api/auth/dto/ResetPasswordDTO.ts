import { IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class ResetPasswordDTO {
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z$-/:-?{-~!"^_`[\]\d]{8,50}$/,
    validationOptionsMsg('Password is not correct (A-Za-z, at least one capital letter; at least one specific character; at least one digit), or too short (min: 8) or too long (max: 50)'))
  @IsNotEmpty(validationOptionsMsg('Password is empty'))
    password: string;
}