import { IsNotEmpty, IsNumber } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class TelegramDTO {
  @IsNumber()
    auth_date: number;

  @IsNotEmpty(validationOptionsMsg('first_name can\'t be empty'))
    first_name: string;

  @IsNotEmpty(validationOptionsMsg('hash can\'t be empty'))
    hash: string;

  @IsNumber()
    id: number;

  @IsNotEmpty(validationOptionsMsg('last_name can\'t be empty'))
    last_name: string;

  @IsNotEmpty(validationOptionsMsg('photo_url can\'t be empty'))
    photo_url: string;

  @IsNotEmpty(validationOptionsMsg('username can\'t be empty'))
    username: string;
}