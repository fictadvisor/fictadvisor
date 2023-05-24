import { State } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, ENG_REGEX, NUM_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateUserDTO {

    @MinLength(2, validationOptionsMsg('Username is too short (min: 2)'))
    @MaxLength(40, validationOptionsMsg('Username is too long (max: 40)'))
    @Matches(
      createRegex(ENG_REGEX, NUM_REGEX, '_'),
      validationOptionsMsg('Username is not correct (a-zA-Z0-9_)')
    )
    @IsOptional()
      username?: string;

    @IsEnum(State, validationOptionsMsg('State is not an enum'))
    @IsOptional()
      state?: State;

    @MaxLength(400, validationOptionsMsg('Avatar link is too long (max: 400)'))
    @IsOptional()
      avatar?: string;

    @IsEmail({}, validationOptionsMsg('Email is not an email'))
    @IsOptional()
      email?: string;
}