import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ENG_REGEX, NUM_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class IdentityQueryDTO {
  @ApiProperty({
    description: 'The username for checking the registration',
  })
  @Matches(new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Username is empty'))
    username: string;

  @ApiProperty({
    description: 'The email for checking the registration',
  })
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  @IsNotEmpty(validationOptionsMsg('Email is empty'))
    email: string;
}