import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import {
  ENG_REGEX,
  NUM_REGEX,
  validationOptionsMsg,
} from '../ValidationUtil';

export class UserDTO {
  @ApiProperty({
    description: 'User\'s username in the application',
  })
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @IsString(validationOptionsMsg('Username must be string'))
    username: string;

  @ApiProperty({
    description: 'User\'s email for registration',
  })
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
  @IsString(validationOptionsMsg('Email must be string'))
    email: string;

  @ApiProperty({
    description: 'User\'s password to access account',
  })
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    validationOptionsMsg('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  @IsString(validationOptionsMsg('Password must be string'))
    password: string;

  @ApiProperty({
    description: 'User\'s avatar url',
  })
  @IsString(validationOptionsMsg('Avatar must be string'))
  avatar?: string;

  @ApiProperty({
    description: 'User\'s telegram id',
  })
  @IsNumber({}, validationOptionsMsg('Telegram id must be a bigint'))
  @IsOptional()
  telegramId?: bigint;
}
