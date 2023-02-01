import { State } from "@prisma/client";
import { IsEmail, IsIn, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {

    @MinLength(4, {
        message: 'username is too short (min: 4)',
    })
    @MaxLength(30, {
        message: 'username is too long (max: 30)',
    })
    @IsNotEmpty({
        message: 'username can not be empty',
    })
    @Matches(
      /^[a-zA-Z0-9_]+$/,
      {
          message: 'username is not correct',
      })
    @IsOptional()
    username?: string;

    @IsIn(Object.keys(State), {
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
          message: 'given email ist not email',
      })
    @IsOptional()
    email?: string;
}