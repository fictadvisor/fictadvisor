import { State } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

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
    @IsOptional()
    username?: string;
    
    @IsOptional()
    state?: State;

    @MaxLength(400, {
        message: 'avatar link is too long (max: 400)',
    })
    @IsOptional()
    avatar?: string;

    @IsEmail()
    @IsOptional()
    email: string;
}