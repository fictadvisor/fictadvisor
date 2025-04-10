import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class TokensDTO {
  @IsNotEmpty(validationOptionsMsg('Refresh token can not be empty'))
    refreshToken: string;

  @IsNotEmpty(validationOptionsMsg('Access token can not be empty'))
    accessToken: string;
}
