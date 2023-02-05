import { State } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {

    @MinLength(2, {
        message: 'username is too short (min: 2)',
    })
    @MaxLength(40, {
        message: 'username is too long (max: 40)',
    })
    @Matches(
      createRegex(ENG_REGEX, NUM_REGEX, "_"),
      {
          message: 'username is not correct',
      })
    @IsOptional()
    username?: string;

    @IsEnum(State, {
        message: 'invalid state argument passed',
    })
    @IsOptional()
    state?: State;

    @MaxLength(400, {
        message: 'avatar link is too long (max: 400)',
    })
    @IsOptional()
    avatar?: string;

    @IsEmail({},
      {
          message: 'given email is not email',
      })
    @IsOptional()
    email?: string;
}