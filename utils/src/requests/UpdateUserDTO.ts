import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import {
  createRegex,
  ENG_REGEX,
  NUM_REGEX,
  validationOptionsMsg,
} from '../ValidationUtil';
import { State } from '../enums';

export class UpdateUserDTO {
    @ApiPropertyOptional({
      description: 'User\'s telegram username',
    })
    @MinLength(2, validationOptionsMsg('Username is too short (min: 2)'))
    @MaxLength(40, validationOptionsMsg('Username is too long (max: 40)'))
    @Matches(
      createRegex(ENG_REGEX, NUM_REGEX, '_'),
      validationOptionsMsg('Username is not correct (a-zA-Z0-9_)')
    )
    @IsOptional()
      username?: string;

    @ApiPropertyOptional({
      description: 'User\'s state',
      enum: State,
    })
    @IsEnum(State, validationOptionsMsg('State must be an enum'))
    @IsOptional()
      state?: State;

    @ApiPropertyOptional({
      description: 'User\'s avatar link',
    })
    @MaxLength(400, validationOptionsMsg('Avatar link is too long (max: 400)'))
    @IsOptional()
      avatar?: string;

    @ApiPropertyOptional({
      description: 'User\'s email',
    })
    @IsEmail({}, validationOptionsMsg('Email must be valid email'))
    @IsOptional()
      email?: string;
}
