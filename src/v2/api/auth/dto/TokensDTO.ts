import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class TokensDTO {
  @IsNotEmpty(validationOptionsMsg('refreshToken can\'t be empty'))
    refreshToken: string;

  @IsNotEmpty(validationOptionsMsg('accessToken can\'t be empty'))
    accessToken: string;
}