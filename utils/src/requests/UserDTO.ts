import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import {
  ENG_REGEX,
  NUM_REGEX,
  validationOptionsMsg
} from '../ValidationUtil';
import { State } from '../enums/db/StateEnum';

export class UserDTO {
  @ApiProperty({
    description: 'User\'s username in the application',
  })
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
    username: string;

  @ApiProperty({
    description: 'User\'s email for registration',
  })
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
    email: string;

  @ApiProperty({
    description: 'User\'s password to access account',
  })
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    validationOptionsMsg('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
    password: string;

  avatar?: string;
  telegramId?: bigint;
}

export class CreateUserDTO {
  @ApiProperty({
    description: 'User\'s username in the application',
  })
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
    username: string;

  @ApiProperty({
    description: 'User\'s email',
  })
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
    email: string;

  @ApiProperty({
    description: 'User\'s state',
    enum: State,
  })
  @IsEnum(State, validationOptionsMsg('State value is not in enum'))
  @IsNotEmpty(validationOptionsMsg('State cannot be empty'))
    state: State;
}