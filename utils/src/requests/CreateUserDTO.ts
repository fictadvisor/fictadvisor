import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import {
  createRegex,
  ENG_REGEX,
  NUM_REGEX,
  validationOptionsMsg,
} from '../ValidationUtil';
import { State } from '../enums';

export class CreateUserDTO {
    @ApiProperty({
      description: 'User\'s username in the application',
    })
    @MinLength(2, validationOptionsMsg('Username is too short (min: 2)'))
    @MaxLength(40, validationOptionsMsg('Username is too long (max: 40)'))
    @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
    @Matches(
      createRegex(ENG_REGEX, NUM_REGEX, '_'),
      validationOptionsMsg('Username is incorrect (a-zA-Z0-9_))')
    )
      username: string;

    @ApiProperty({
      description: 'User\'s email',
    })
    @IsEmail({}, validationOptionsMsg('Email must be a valid email'))
    @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
      email: string;

    @ApiProperty({
      description: 'User\'s state',
      enum: State,
    })
    @IsEnum(State, validationOptionsMsg('State must be an enum'))
    @IsNotEmpty(validationOptionsMsg('State cannot be empty'))
      state: State;
}
