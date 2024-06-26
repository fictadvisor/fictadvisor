import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class TokensDTO {
  @IsNotEmpty(validationOptionsMsg('Refresh token can not be empty'))
    refreshToken: string;

  @IsNotEmpty(validationOptionsMsg('Access token can not be empty'))
    accessToken: string;
}