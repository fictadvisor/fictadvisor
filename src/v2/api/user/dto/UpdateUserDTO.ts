import { State } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, ENG_REGEX, NUM_REGEX, validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdateUserDTO {

    @MinLength(2, validationOptionsMsg('username is too short (min: 2)'))
    @MaxLength(40, validationOptionsMsg('username is too long (max: 40)'))
    @Matches(
      createRegex(ENG_REGEX, NUM_REGEX, '_'), validationOptionsMsg('username is not correct (a-zA-Z0-9_)'))
    @IsOptional()
      username?: string;

    @IsEnum(State, validationOptionsMsg('invalid state argument passed'))
    @IsOptional()
      state?: State;

    @MaxLength(400, validationOptionsMsg('avatar link is too long (max: 400)'))
    @IsOptional()
      avatar?: string;

    @IsEmail({}, validationOptionsMsg('given email is not email'))
    @IsOptional()
      email?: string;
}