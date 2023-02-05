import { State } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {

    @MinLength(4, {
        message: 'username is too short (min: 4)',
    })
    @MaxLength(30, {
        message: 'username is too long (max: 30)',
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