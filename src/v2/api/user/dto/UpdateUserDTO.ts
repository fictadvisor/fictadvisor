import { State } from "@prisma/client";
import { IsAlphanumeric, IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

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
    @IsAlphanumeric('en-US',
      {
        message: 'username contains wrong symbols (only a-z A-Z 0-9)',
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