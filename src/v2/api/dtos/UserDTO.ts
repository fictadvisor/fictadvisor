import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ENG_REGEX, NUM_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {

  @ApiProperty()
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Username is empty'))
    username: string;

  @ApiProperty()
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  @IsNotEmpty(validationOptionsMsg('Email is empty'))
    email: string;

  @ApiProperty()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
    validationOptionsMsg('The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter'))
  @IsNotEmpty(validationOptionsMsg('password is empty'))
    password: string;

  avatar?: string;
  telegramId?: number;
}