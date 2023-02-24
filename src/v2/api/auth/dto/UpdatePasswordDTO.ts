import { IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdatePasswordDTO {
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z$-/:-?{-~!"^_`[\]\d]{8,50}$/,
    validationOptionsMsg('password is not correct or too short (min: 8) or too long (max: 50)'))
  @IsNotEmpty(validationOptionsMsg('password is empty'))
    oldPassword: string;
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z$-/:-?{-~!"^_`[\]\d]{8,50}$/,
    validationOptionsMsg('password is not correct or too short (min: 8) or too long (max: 50)'))
  @IsNotEmpty(validationOptionsMsg('password is empty'))
    newPassword: string;
}