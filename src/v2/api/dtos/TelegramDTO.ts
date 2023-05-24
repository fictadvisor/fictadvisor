import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class TelegramDTO {
  @IsNumber()
    auth_date: number;

  @IsNotEmpty(validationOptionsMsg('first_name can not be empty'))
    first_name: string;

  @IsNotEmpty(validationOptionsMsg('hash can not be empty'))
    hash: string;

  @IsNumber()
    id: number;

  @IsOptional()
    last_name: string;

  @IsNotEmpty(validationOptionsMsg('photo_url can not be empty'))
    photo_url: string;

  @IsNotEmpty(validationOptionsMsg('username can not be empty'))
    username: string;
}